import express from "express";

import { singupUser, loginUser } from "../controllers/authController.js";

const router = express.Router();
router.route("/singup").post(singupUser);
router.route("/login").post(loginUser);

export default router;
