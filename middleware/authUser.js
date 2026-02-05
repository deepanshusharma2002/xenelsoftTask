const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        if (!authHeader || !authHeader.startsWith("Bearer") || !token)
            return res.status(403).json({ success: false, message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const validateUser = await User.findById(decoded.id).select("-password -createdAt -updatedAt").lean();
        if (!validateUser) {
            return res.status(401).json({ success: false, message: "Token expired or invalid" });
        }
        req.user = validateUser;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Token expired or invalid" });
    }
};
