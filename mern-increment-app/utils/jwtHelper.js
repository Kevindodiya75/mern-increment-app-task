import jwt from "jwt-simple";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  const payload = { id: userId };
  return jwt.encode(payload, JWT_SECRET);
};

const decodeToken = (token) => {
  try {
    return jwt.decode(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { generateToken, decodeToken };
