import { z } from "zod";

export const orderIdSchema = z.string().trim().min(1, { message: "Producr Id is required" });

export const createOrderSchema = z.object({
  team: z.string().trim().min(1, { message: "Team Id is required" }),
  product: z.string().trim().min(1, { message: "Product Id is required" }),
  quantity: z.number().min(1, { message: "Quantity must be a positive number" }),
  price: z.number().min(0, { message: "Price must be a positive number" }),
});

export const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});
