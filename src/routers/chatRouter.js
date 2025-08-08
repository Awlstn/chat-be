import express from "express";
import checkLogin from "../utils/checkLogin.js";
import { createRoom } from "../controllers/chatController.js";

const router = express.Router();
router.route("/room").post(checkLogin, createRoom);

export default router;
