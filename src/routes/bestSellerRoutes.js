import { Router } from "express";
import { uploadFile } from "../middlewares/multer.js";
import { createBestSeller, deleteBestSellerById, getAllBestSeller } from "../controllers/bestSeller/bestSeller.js";
import auth from "../middlewares/auth.js";

export const bestSellerRouter = Router()

bestSellerRouter.post("/addTo-bestSeller", auth, uploadFile.single("photo"), createBestSeller)
bestSellerRouter.get("/getAllBestSeller", getAllBestSeller)
bestSellerRouter.delete("/deleteBestSeller/:id", auth, deleteBestSellerById)