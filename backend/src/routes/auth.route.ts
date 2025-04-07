import { Router } from "express";
import {
  getAllRollsController,
  loginController,
  logOutController,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

authRoutes.get("/roles/all", getAllRollsController);

export default authRoutes;
