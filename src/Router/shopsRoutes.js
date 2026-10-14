
import express from "express";
import ShopServices from "../Services/shopServices.js";
const router = express.Router();

router.get("/", ShopServices.GetAllShops);
router.post("/create", ShopServices.ShopCreate);

export default router;