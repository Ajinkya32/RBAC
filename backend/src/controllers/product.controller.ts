import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import { createProductSchema, updateProductSchema } from "../validation/product.validation";
import { getUserRole } from "../services/auth.service";
import { roleGuard } from "../utils/roleGuard";
import { Permissions } from "../enums/role.enum";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "../services/product.service";
import { HTTPSTATUS } from "../config/http.config";
import { BadRequestException } from "../utils/appError";
import path from "path";

export const createProductController = asyncHandler(async (req: Request, res: Response) => {
  const body = createProductSchema.parse({
    ...req.body,
  });

  const userId = req.user?._id;

  const { role } = await getUserRole(userId);

  roleGuard(role, [Permissions.CREATE_PRODUCT]);

  const imageFile = req.file;

  if (!imageFile) {
    throw new BadRequestException("Image file is required");
  }

  const imageURL = `/uploads/${path.basename(imageFile.path as string)}`;

  const newProduct = await createProductService(userId, { ...body, image: imageURL });

  return res.status(HTTPSTATUS.CREATED).json({
    message: "Product created successfully",
    product: newProduct,
  });
});

export const getAllProductsController = asyncHandler(async (req: Request, res: Response) => {
  const products = await getAllProductsService();

  return res.status(HTTPSTATUS.OK).json({
    message: "Products fetched successfully",
    products,
  });
});

export const getProductByIdController = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const product = await getProductByIdService(productId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Product fetched successfully",
    product,
  });
});

export const updateProductController = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const body = updateProductSchema.parse({
    ...req.body,
  });

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.EDIT_PRODUCT]);

  let imageURL;

  if (req.file) {
    imageURL = `/uploads/${path.basename(req.file.path as string)}`;
    body.image = imageURL;
  }

  const updatedProduct = await updateProductService(productId, body);

  return res.status(HTTPSTATUS.OK).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

export const deleteProductController = asyncHandler(async (req: Request, res: Response) => {
  const productId = req.params.id;

  const { role } = await getUserRole(req.user?._id);

  roleGuard(role, [Permissions.DELETE_PRODUCT]);

  const deletedProduct = await deleteProductService(productId);

  return res.status(HTTPSTATUS.OK).json({
    message: "Product deleted successfully",
    product: deletedProduct,
  });
});
