import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: String, unique: true, required: true },
  incrementValue: { type: Number, default: 0 },
});

export default mongoose.model("User", UserSchema);
