import { z } from "zod";

export const emailSchema = z.string().trim().email("Invalid email address").min(1).max(255);

export const passwordSchema = z.string().trim().min(4);

export const createUserSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: emailSchema,
  password: passwordSchema,
  teamId: z.string().trim().min(1).max(255).optional(),
  roleId: z.string().trim().min(1).max(255),
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  email: emailSchema.optional(),
  password: passwordSchema.optional(),
  teamId: z.string().trim().min(1).max(255).optional(),
  roleId: z.string().trim().min(1).max(255).optional(),
});
