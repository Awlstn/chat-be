import express from "express";
import checkLogin from "../utils/checkLogin.js";
import { createRoom, getRoom } from "../controllers/chatController.js";

const router = express.Router();
router.route("/room").post(checkLogin, createRoom).get(checkLogin, getRoom);

export default router;
