import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateRefreshToken = (user) => {
	return jwt.verify(user, process.env.JWT_SECRET_REFRESH, { expiresIn: "1m" });
};

// module.exports = generateRefreshToken;
