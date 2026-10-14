
import express from "express";
const router = express.Router();
import productServices from "../Services/productServices.js";

router.get("/", productServices.GetAllProducts);
router.post("/create", productServices.ProductCreate);

export default router;