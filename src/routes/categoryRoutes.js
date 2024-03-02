import { Router } from "express";
import { createCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/category/category.controller.js";
import auth from "../middlewares/auth.js";


export const categoryRouter = Router()

categoryRouter.post("/create-category", auth, createCategory)
categoryRouter.get("/getAll-categories", getAllCategory)
categoryRouter.delete("/delete-category/:id", auth, deleteCategory)
categoryRouter.post("/update-category/:id", auth, updateCategory)