import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { z } from "zod";
import { HTTPSTATUS } from "../config/http.config";
import {
  createMemberService,
  deleteMemberService,
  getTeamMembersService,
} from "../services/member.service";
import { getUserRole } from "../services/auth.service";
import { Permissions } from "../enums/role.enum";
import { roleGuard } from "../utils/roleGuard";
import { teamIdSchema } from "../validation/team.validation";

export const createMemberController = asyncHandler(async (req: Request, res: Response) => {
  const joinTeamSchema = z.object({
    userId: z.string().trim(),
    teamId: z.string().trim(),
  });

  const { userId, teamId } = joinTeamSchema.parse(req.body);

  const { role } = await getUserRole(req.user?._id);

  await roleGuard(role, [Permissions.CREATE_USER]);

  const newMember = await createMemberService(userId, teamId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Member Successfully joined the team",
    newMember,
  });
});

export const deleteMemberController = asyncHandler(async (req: Request, res: Response) => {
  const memberId = req.params.memberId;

  const { role } = await getUserRole(req.user?._id);

  await roleGuard(role, [Permissions.DELETE_MEMBER]);

  const { deletedMember } = await deleteMemberService(memberId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Member removed successfully",
    deletedMember,
  });
});

export const getTeamMembersController = asyncHandler(async (req: Request, res: Response) => {
  const teamId = teamIdSchema.parse(req.params.id);

  const { role } = await getUserRole(req.user?._id);

  await roleGuard(role, [Permissions.VIEW_MEMBER]);

  const { members } = await getTeamMembersService(teamId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Team members retrieved successfully",
    members,
  });
});
