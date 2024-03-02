import { User } from "../../models/user.model.js";
import { hashPassword } from "../../utils/bcrypt.js";


export const forgotPassword = async (req, res) => {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
        res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    const compareAnswer = await User.findOne({ answer })
    if (!compareAnswer) {
        res.status(409).json({
            success: false,
            message: "User is not registered and the answer is in correct"
        })
    }
    const newHashPassword = await hashPassword(newPassword)
    await User.findOneAndUpdate({ password: newHashPassword })
    res.status(201).json({
        success: true,
        message: "Password is reset successfully"
    })
}