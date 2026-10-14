// src/Models/counters.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  _id: { type: String },          // prefix: "USER", "PRO", "SHOP"
  seq: { type: Number, default: 0 },
});

export default mongoose.model("counters", counterSchema);