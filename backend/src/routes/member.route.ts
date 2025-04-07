import { Router } from "express";
import {
  createMemberController,
  deleteMemberController,
  getTeamMembersController,
} from "../controllers/member.controller";

const memberRoutes = Router();

memberRoutes.post("/create", createMemberController);

memberRoutes.put("/delete/:memberId", deleteMemberController);

memberRoutes.get("/team/:id", getTeamMembersController);

export default memberRoutes;
