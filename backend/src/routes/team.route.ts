import { Router } from "express";
import {
  createTeamController,
  deleteTeamByIdController,
  getAllTeamsController,
  getAllTeamsUserIsMemberController,
  getTeamAnalyticsController,
  getTeamByIdController,
  updateTeamByIdController,
} from "../controllers/team.controller";

const teamRoutes = Router();

teamRoutes.post("/create", createTeamController);

teamRoutes.get("/myTeams", getAllTeamsUserIsMemberController);

teamRoutes.put("/update/:id", updateTeamByIdController);

teamRoutes.put("/delete/:id", deleteTeamByIdController);

teamRoutes.get("/analytics/:id", getTeamAnalyticsController);

teamRoutes.get("/:id", getTeamByIdController);

teamRoutes.get("/", getAllTeamsController);

export default teamRoutes;
