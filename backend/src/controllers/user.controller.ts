import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { HTTPSTATUS } from "../config/http.config";
import {
  changeUserRoleService,
  createUserService,
  deleteUserService,
  getAllManagersService,
  getAllUserService,
  getCurrentUserService,
  setCurrentTeamService,
  updateUserService,
} from "../services/user.service";
import { changeRoleSchema } from "../validation/team.validation";
import { getUserRole } from "../services/auth.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";
import { createUserSchema, updateUserSchema } from "../validation/user.validation";

export const getAllUserController = asyncHandler(async (req: Request, res: Response) => {
  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.VIEW_USER]);

  const users = await getAllUserService();

  return res.status(HTTPSTATUS.OK).json({
    message: "All Users fetch successfully",
    users,
  });
});

export const getCurrentUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  const { user } = await getCurrentUserService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});

export const createUserController = asyncHandler(async (req: Request, res: Response) => {
  const body = createUserSchema.parse({
    ...req.body,
  });

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.CREATE_USER]);

  await createUserService(body);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "User created successfully",
  });
});

export const changeUserRoleController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const { roleId } = changeRoleSchema.parse(req.body);

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.CHANGE_MEMBER_ROLE]);

  const { user } = await changeUserRoleService(userId, roleId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Member Role changed successfully",
    user,
  });
});

export const updateUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const body = updateUserSchema.parse({
    ...req.body,
  });

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.EDIT_USER]);

  const { user } = await updateUserService(userId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "User fetch successfully",
    user,
  });
});

export const deleteUserController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.DELETE_USER]);

  await deleteUserService(userId);

  return res.status(HTTPSTATUS.OK).json({
    message: "User deleted successfully",
  });
});

export const getAllManagersController = asyncHandler(async (req: Request, res: Response) => {
  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.VIEW_USER]);

  const managers = await getAllManagersService();

  return res.status(HTTPSTATUS.OK).json({
    message: "All Managers fetch successfully",
    managers,
  });
});

export const setCurrentTeamController = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  const teamId = req.params?.teamId;

  const user = await setCurrentTeamService(userId, teamId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Current Team Set successfully",
    user,
  });
});
