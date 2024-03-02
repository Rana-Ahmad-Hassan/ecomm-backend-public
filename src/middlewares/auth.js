import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is required" });
    }


    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Bearer token is required" });
    }

    try {

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decoded.id;


        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "Invalid or expired token provided",
        });
    }
};

export default auth;
