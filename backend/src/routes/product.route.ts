import { Router } from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";
import { upload } from "../utils/multer";

const productRoutes = Router();

productRoutes.post("/create", upload.single("image"), createProductController);

productRoutes.put("/update/:id", upload.single("image"), updateProductController);

productRoutes.put("/delete/:id", deleteProductController);

productRoutes.get("/:id", getProductByIdController);

productRoutes.get("/", getAllProductsController);

export default productRoutes;
