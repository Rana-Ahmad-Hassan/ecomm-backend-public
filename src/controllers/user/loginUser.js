import { User } from "../../models/user.model.js";
import { comparePassword } from "../../utils/bcrypt.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        const compareExistingPassword = await comparePassword(password, existingUser.password);

        if (!compareExistingPassword) {
            return res.status(401).json({
                success: false,
                message: "The password is incorrect"
            });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.ACCESS_TOKEN);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                email,
                token
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};
