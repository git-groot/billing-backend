
//src/Router/UserRoutes.js


import express from 'express';
import { login, register } from '../Services/auth.js';
const Router = express.Router();

Router.get("/", (req, res) => {
  res.json({ ok: true, message: "User 12Routes" });
});

Router.post("/register", register);
Router.post("/login", login);

export default Router;