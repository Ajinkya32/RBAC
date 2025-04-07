import { Router } from "express";
import {
  getAllUserController,
  changeUserRoleController,
  createUserController,
  deleteUserController,
  getCurrentUserController,
  updateUserController,
  getAllManagersController,
  setCurrentTeamController,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/all", getAllUserController);

userRoutes.post("/create", createUserController);

userRoutes.get("/current", getCurrentUserController);

userRoutes.get("/managers", getAllManagersController);

userRoutes.put("/update/:id", updateUserController);

userRoutes.put("/setCurrentTeam/:teamId", setCurrentTeamController);

userRoutes.put("/delete/:id", deleteUserController);

userRoutes.put("/update/role/:id", changeUserRoleController);

export default userRoutes;
