import { Router } from "express";
import { createProduct, deleteOneProduct, getAllProducts, getProductByCategory, getProductById, updateProductById } from "../controllers/products/products.controller.js";
import auth from "../middlewares/auth.js";
import { uploadFile } from "../middlewares/multer.js";




export const productRouter = Router();


productRouter.post("/create-product", auth, uploadFile.single("photo"), createProduct);
productRouter.get("/all-products", getAllProducts);
productRouter.delete("/delete-product/:id", auth, deleteOneProduct);
productRouter.post("/update-product/:id", auth, updateProductById);
productRouter.get("/productById/:id", getProductById)
productRouter.get("/productByCategory/:id", getProductByCategory)

