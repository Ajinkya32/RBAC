import { BadRequestException, NotFoundException } from "../utils/appError";
import ProductModel, { ProductDocument } from "../models/product.model";
import path from "path";

export const createProductService = async (userId: String, body: Partial<ProductDocument>) => {
  const { name, image } = body;

  try {
    const productExists = await ProductModel.findOne({ name });
    if (productExists) {
      throw new BadRequestException("Product already exists");
    }

    if (!image) {
      throw new BadRequestException("Image path is missing");
    }

    const newProduct = await ProductModel.create({ ...body, image: image, createdBy: userId });
    if (!newProduct) {
      throw new BadRequestException("Failed to create product");
    }

    return newProduct;
  } catch (error) {
    throw error;
  }
};

export const getAllProductsService = async () => {
  const products = await ProductModel.find({}).populate("createdBy").sort({ createdAt: -1 });
  return products;
};

export const getProductByIdService = async (id: string) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new NotFoundException("Product not found");
  }
  return product;
};

export const updateProductService = async (productId: string, body: Partial<ProductDocument>) => {
  const { name, description, price, image } = body;

  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      { name, description, price, image },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new BadRequestException("Failed to update product");
    }

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProductService = async (id: string) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const deletedProduct = await ProductModel.deleteOne({ _id: id });
    if (!deletedProduct) {
      throw new BadRequestException("Failed to delete product");
    }

    return deletedProduct;
  } catch (error) {
    throw error;
  }
};
