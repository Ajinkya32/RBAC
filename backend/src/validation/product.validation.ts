import { z } from "zod";

export const productIdSchema = z.string().trim().min(1, { message: "Producr Id is required" });

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Product name is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  price: z.preprocess(
    (val) => Number(val),
    z.number().min(1, { message: "Price must be at least 1" })
  ),
  image: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Product name is required" }).optional(),
  description: z.string().trim().min(1, { message: "Description is required" }).optional(),
  price: z
    .preprocess((val) => Number(val), z.number().min(1, { message: "Price must be at least 1" }))
    .optional(),
  image: z.string().optional(),
});
