import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/Utils/Db.connect.js";
import UserRoutes from "./src/Router/UserRoutes.js";
import ShopRoutes from "./src/Router/shopsRoutes.js";
import ProductRoutes from "./src/Router/ProductRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, app: "Biscuit Billing API" }));

//Routes
app.use("/api/users",UserRoutes);
app.use("/api/shops",ShopRoutes);
app.use("/api/products",ProductRoutes);





const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});