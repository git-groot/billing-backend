// src/Models/shops.js
import mongoose from "mongoose";
import idPlugin from "../Utils/idPlugin.js";

const shopSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true, sparse: true, immutable: true },
        name: { type: String, required: true, trim: true },       // kadai peyar
        ownerName: { type: String, trim: true },                  // muthalali peyar
        phone: { type: String, trim: true },
        email: { type: String, trim: true },
        address: { type: String, trim: true },
        outstanding: { type: Number, default: 0 },                // shop kitta vara vendiya balance
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

shopSchema.plugin(idPlugin, "SHOP");

export default mongoose.model("shops", shopSchema);