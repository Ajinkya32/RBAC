import { z } from "zod";

export const teamIdSchema = z.string().trim().min(1, { message: "Team ID is required" });

export const changeRoleSchema = z.object({
  roleId: z.string().trim().min(1),
});

export const createTeamSchema = z.object({
  name: z.string().trim().min(1, { message: "Team name is required" }),
  managerId: z.string().trim().min(1, { message: "Manager ID is required" }),
});

export const updateTeamSchema = z.object({
  name: z.string().trim().optional(),
  managerId: z.string().trim().optional(),
});
