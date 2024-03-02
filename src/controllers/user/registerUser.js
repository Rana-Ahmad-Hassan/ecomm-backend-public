import { User } from "../../models/user.model.js";
import { hashPassword } from "../../utils/bcrypt.js";

export const registerUser = async (req, res) => {
    const { name, email, password, location, answer, phone } = req.body;

    if (!name || !email || !password || !location || !answer || !phone) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already registered"
            });
        }

        const newPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: newPassword,
            location,
            answer,
            phone
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                name: user.name,
                phone: user.phone

            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
