import express from "express";

import { singupUser } from "../controllers/authController.js";

const router = express.Router();
router.route("/singup").post(singupUser);

export default router;
