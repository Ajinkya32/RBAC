import { Router } from "express";
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
  getTeamOrdersController,
  getMyOrdersController,
  getMyOrdersAnalyticsController,
} from "../controllers/order.controller";

const orderRoutes = Router();

orderRoutes.get("/myorders", getMyOrdersController);

orderRoutes.get("/myorders/analytics", getMyOrdersAnalyticsController);

orderRoutes.post("/create", createOrderController);

orderRoutes.put("/update/:id", updateOrderController);

orderRoutes.put("/delete/:id", deleteOrderController);

orderRoutes.get("/team/:id", getTeamOrdersController);

orderRoutes.get("/:id", getOrderByIdController);

orderRoutes.get("/", getAllOrdersController);

export default orderRoutes;
