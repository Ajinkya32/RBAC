import { z } from "zod";

export const emailSchema = z.string().trim().email("Invalid email address").min(1).max(255);

export const passwordSchema = z.string().trim().min(4);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
