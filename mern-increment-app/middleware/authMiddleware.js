import { decodeToken } from "../utils/jwtHelper.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    req.user = decodeToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
