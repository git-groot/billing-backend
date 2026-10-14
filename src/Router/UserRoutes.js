
//src/Router/UserRoutes.js


import express from 'express';
import { login, register } from '../Services/auth.js';
const router = express.Router();
import UserServices from '../Services/userServices.js';

router.get("/", (req, res) => {
  res.json({ ok: true, message: "User Routes" });
});

router.post("/register", register);
router.post("/login", login);
router.post("/createUser", UserServices.UserCreate);
router.get("/getAllUsers", UserServices.UserFilter);

export default router;