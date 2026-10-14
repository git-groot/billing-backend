
import product from "../Models/products.js";
import { Create, GetAll } from "../Controller/commonController.js";

const ProductCreate = async (req, res) => {
    try {
        const data = await Create(req, res, product);
        res.status(201).json({ message: "success", data });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
};

const GetAllProducts = async (req, res) => {
    try {
        const data = await GetAll(req, res, product);
        res.status(200).json({ message: "success", data });
    } catch (err) {
        res.status(500).json({ message: "error", error: err.message });
    }
};

export default { ProductCreate, GetAllProducts };