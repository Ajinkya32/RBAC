import { Request, Response } from "express";

import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import {
  teamIdSchema,
  changeRoleSchema,
  createTeamSchema,
  updateTeamSchema,
} from "../validation/team.validation";
import { HTTPSTATUS } from "../config/http.config";
import {
  createTeamService,
  deleteTeamService,
  getAllTeamsService,
  getAllTeamsUserIsMemberService,
  getTeamAnalyticsAdminService,
  getTeamAnalyticsService,
  getTeamByIdService,
  updateTeamByIdService,
} from "../services/team.service";

import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";
import { getUserRole } from "../services/auth.service";

export const createTeamController = asyncHandler(async (req: Request, res: Response) => {
  const body = createTeamSchema.parse(req.body);

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.CREATE_USER]);

  const { team } = await createTeamService(body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Team created successfully",
    team,
  });
});

export const getAllTeamsController = asyncHandler(async (req: Request, res: Response) => {
  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.VIEW_TEAM]);

  const teams = await getAllTeamsService();

  return res.status(HTTPSTATUS.OK).json({
    message: "All Teams fetched successfully",
    teams,
  });
});

export const getAllTeamsUserIsMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?._id;

    const { role } = await getUserRole(userId);

    let teams = [];

    if (role.name === "ADMIN") {
      teams = await getAllTeamsService();
    } else {
      teams = await getAllTeamsUserIsMemberService(userId);
    }

    return res.status(HTTPSTATUS.OK).json({
      message: "Teams fetched successfully",
      teams,
    });
  }
);

export const getTeamByIdController = asyncHandler(async (req: Request, res: Response) => {
  const teamId = teamIdSchema.parse(req.params.id);

  const { team } = await getTeamByIdService(teamId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Team fetched successfully",
    team,
  });
});

export const getTeamAnalyticsController = asyncHandler(async (req: Request, res: Response) => {
  const teamId = teamIdSchema.parse(req.params.id);

  const { role } = await getUserRole(req.user?._id);

  let analytics;

  if (role.name === "ADMIN") {
    analytics = await getTeamAnalyticsAdminService();
  } else {
    analytics = await getTeamAnalyticsService(teamId);
  }

  return res.status(HTTPSTATUS.OK).json({
    message: "Team analytics retrieved successfully",
    analytics,
  });
});

export const updateTeamByIdController = asyncHandler(async (req: Request, res: Response) => {
  const teamId = teamIdSchema.parse(req.params.id);
  const updateData = updateTeamSchema.parse(req.body);

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.EDIT_TEAM]);

  const { team } = await updateTeamByIdService(teamId, updateData);

  return res.status(HTTPSTATUS.OK).json({
    message: "Team updated successfully",
    team,
  });
});

export const deleteTeamByIdController = asyncHandler(async (req: Request, res: Response) => {
  const teamId = teamIdSchema.parse(req.params.id);

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.DELETE_TEAM]);

  const { currentTeam } = await deleteTeamService(teamId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Team deleted successfully",
    currentTeam,
  });
});
