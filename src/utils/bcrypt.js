import bcrypt from "bcrypt"

export const hashPassword = async (password) => {
    const salt = 10;
    const hashPasswordBcrypt = await bcrypt.hash(password, salt)
    return hashPasswordBcrypt
}


export const comparePassword = async (password, newPassword) => {
    const comparePasswordBcrypt = await bcrypt.compare(password, newPassword)
    return comparePasswordBcrypt
}