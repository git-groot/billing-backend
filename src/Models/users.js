// src/Models/users.js
import mongoose from "mongoose";
import idPlugin from "../Utils/idPlugin.js";
const userSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true, immutable: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["SuperAdmin", "Admin", "User", "worker"], default: "User" },
  },
  { timestamps: true }
);

userSchema.plugin(idPlugin, "USE");

export default mongoose.model("User", userSchema);