import express from "express";
import checkLogin from "../utils/checkLogin.js";
import { getRoomMessages } from "../controllers/messageController.js";

const router = express.Router();
router.route("/").get(checkLogin, getRoomMessages);

export default router;
