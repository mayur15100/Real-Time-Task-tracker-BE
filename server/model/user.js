// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, default: "Guest User" },
  password: { type: String },
});

export default mongoose.model("User", userSchema);
