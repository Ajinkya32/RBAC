import { Router } from "express";
import {
  getAllRollsController,
  loginController,
  logOutController,
  updateRolePermissionsController,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

authRoutes.get("/roles/all", getAllRollsController);

authRoutes.put("/roles/update/:id", updateRolePermissionsController);

export default authRoutes;
