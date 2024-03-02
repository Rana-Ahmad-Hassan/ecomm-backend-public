import { Router } from "express";
import { registerUser } from "../controllers/user/registerUser.js";
import { loginUser } from "../controllers/user/loginUser.js";
import { forgotPassword } from "../controllers/user/forgotPassword.js";


export const router = Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/forgot-password", forgotPassword)