import express from "express"
import { router } from "./src/routes/userRoutes.js";
import { productRouter } from "./src/routes/productRoutes.js";
import { categoryRouter } from "./src/routes/categoryRoutes.js";
import { bestSellerRouter } from "./src/routes/bestSellerRoutes.js";


export const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow access from this origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Corrected the headers
    next();
});

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/user", router)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/bestSeller", bestSellerRouter)