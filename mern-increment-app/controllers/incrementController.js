import User from "../models/User.js";
import { decodeToken } from "../utils/jwtHelper.js";

const increment = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.incrementValue += 1;
    await user.save();

    res.json({ incrementValue: user.incrementValue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getIncrementValue = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ incrementValue: user.incrementValue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { increment, getIncrementValue };
