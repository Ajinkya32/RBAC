import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createOrderSchema, updateOrderSchema } from "../validation/order.validation";
import { getUserRole } from "../services/auth.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";
import {
  createOrderService,
  deleteOrderService,
  getAllOrdersService,
  getMyOrdersAnalyticsService,
  getMyOrdersService,
  getOrderByIdService,
  getTeamOrdersService,
  updateOrderService,
} from "../services/order.service";
import { HTTPSTATUS } from "../config/http.config";
import { teamIdSchema } from "../validation/team.validation";

export const createOrderController = asyncHandler(async (req: Request, res: Response) => {
  const body = createOrderSchema.parse({
    ...req.body,
  });

  const userId = req.user?._id;

  const { role } = await getUserRole(userId);

  roleGuard(role, [Permissions.CREATE_ORDER]);

  const newOrder = await createOrderService(userId, body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Order created successfully",
    order: newOrder,
  });
});

export const getAllOrdersController = asyncHandler(async (req: Request, res: Response) => {
  const orders = await getAllOrdersService();

  return res.status(HTTPSTATUS.OK).json({
    message: "Orders fetched successfully",
    orders,
  });
});

export const getOrderByIdController = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const order = await getOrderByIdService(orderId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Order fetched successfully",
    order,
  });
});

export const updateOrderController = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const body = updateOrderSchema.parse({
    ...req.body,
  });

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.EDIT_ORDER]);

  const updatedOrder = await updateOrderService(orderId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Order updated successfully",
    order: updatedOrder,
  });
});

export const deleteOrderController = asyncHandler(async (req: Request, res: Response) => {
  const orderId = req.params.id;

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.DELETE_ORDER]);

  const deletedOrder = await deleteOrderService(orderId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Order deleted successfully",
    order: deletedOrder,
  });
});

export const getTeamOrdersController = asyncHandler(async (req: Request, res: Response) => {
  const teamId = teamIdSchema.parse(req.params.id);

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.VIEW_ORDER]);

  const { orders } = await getTeamOrdersService(teamId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Team orders retrieved successfully",
    orders,
  });
});

export const getMyOrdersController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { orders } = await getMyOrdersService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "My orders retrieved successfully",
    orders,
  });
});

export const getMyOrdersAnalyticsController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const analytics = await getMyOrdersAnalyticsService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "My Orders analytics retrieved successfully",
    analytics,
  });
});
