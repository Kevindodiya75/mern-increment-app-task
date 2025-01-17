import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/jwtHelper.js";
import { v4 as uuidv4 } from "uuid";

const register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const userId = uuidv4();

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    userId,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  res.json({
    token,
    username: newUser.username,
    userId: newUser.userId,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = generateToken(user._id);

  res.json({
    token,
    username: user.username,
    userId: user.userId,
  });
};

export { register, login };
