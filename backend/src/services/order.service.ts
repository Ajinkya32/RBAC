import { BadRequestException, NotFoundException } from "../utils/appError";
import OrderModel, { OrderDocument } from "../models/order.model";
import { OrderStatusEnum } from "../enums/order.enum";

interface CreateOrderInput {
  team: string;
  product: string;
  quantity: number;
  price: number;
}

interface UpdateOrderInput {
  team?: string;
  product?: string;
  quantity?: number;
  price?: number;
  status?: string;
}

export const createOrderService = async (userId: String, body: CreateOrderInput) => {
  try {
    const newOrder = await OrderModel.create({ ...body, customer: userId });
    if (!newOrder) {
      throw new BadRequestException("Failed to create order");
    }

    return newOrder;
  } catch (error) {
    throw error;
  }
};

export const getAllOrdersService = async () => {
  const orders = await OrderModel.find({})
    .populate(["customer", "product", "team"])
    .sort({ createdAt: -1 });
  return orders;
};

export const getOrderByIdService = async (id: string) => {
  const order = await OrderModel.findById(id).populate(["customer", "product", "team"]);
  if (!order) {
    throw new NotFoundException("Order not found");
  }
  return order;
};

export const updateOrderService = async (orderId: string, body: Partial<UpdateOrderInput>) => {
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      throw new BadRequestException("Failed to update order");
    }

    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

export const deleteOrderService = async (id: string) => {
  try {
    const order = await OrderModel.findById(id);
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const deletedOrder = await OrderModel.deleteOne({ _id: id });
    if (!deletedOrder) {
      throw new BadRequestException("Failed to delete order");
    }

    return deletedOrder;
  } catch (error) {
    throw error;
  }
};

export const getTeamOrdersService = async (teamId: string) => {
  // Fetch all members of the team

  const orders = await OrderModel.find({
    team: teamId,
  })
    .populate("customer", "name email role profilePicture -password")
    .populate("team")
    .populate("product");

  return { orders };
};

export const getMyOrdersService = async (userId: string) => {
  const orders = await OrderModel.find({
    customer: userId,
  })
    .populate("customer", "name email role profilePicture -password")
    .populate("team")
    .populate("product");

  return { orders };
};

export const getMyOrdersAnalyticsService = async (userId: string) => {
  const totalOrders = await OrderModel.countDocuments({ customer: userId });

  const pendingOrders = await OrderModel.countDocuments({
    customer: userId,
    status: OrderStatusEnum.PENDING,
  });

  const deliveredOrders = await OrderModel.countDocuments({
    customer: userId,
    status: OrderStatusEnum.DELIVERED,
  });

  const analytics = {
    totalOrders,
    pendingOrders,
    deliveredOrders,
  };

  return analytics;
};
