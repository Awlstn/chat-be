import express from "express";

import { signupUser, loginUser } from "../controllers/authController.js";

const router = express.Router();
router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);

export default router;
