import mongoose from "mongoose";
import idPlugin from "../Utils/idPlugin.js";

const productSchema = new mongoose.Schema(
    {
        id: { type: String, unique: true, sparse: true, immutable: true },
        name: { type: String, required: true, trim: true },
        packSize: { type: String, trim: true },            // e.g. "12 x 50g box"
        active: { type: Boolean, default: true },
        image: { type: String, trim: true },
        buyingPrice: { type: Number, required: true, min: 0 }, // single piece price
        sellingPrice: { type: Number, required: true, min: 0 }, // single piece price
        boxBuyingPrice: { type: Number,  min: 0 },
        boxSellingPrice: { type: Number, min: 0 },
        dozenSellingPrice: { type: Number, min: 0 },

    },
    { timestamps: true }
);

productSchema.plugin(idPlugin, "PROD");

export default mongoose.model("products", productSchema);