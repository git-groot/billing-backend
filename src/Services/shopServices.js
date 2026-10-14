import shops from "../Models/shops.js";
import { Create, GetAll } from "../Controller/commonController.js";

const ShopCreate = async (req, res) => {
    try {
        const data = await Create(req, res, shops);
        res.status(201).json({ message: "success", data });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
};

const GetAllShops = async (req, res) => {
    try {
        const data = await GetAll(req, res, shops);
        res.status(200).json({ message: "success", data });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
};

export default { ShopCreate, GetAllShops };