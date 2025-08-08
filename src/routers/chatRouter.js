import express from "express";
import checkLogin from "../utils/checkLogin";
import { createRoom } from "../controllers/chatController";

const router = express.Router();
router.route("/room").post(checkLogin, createRoom);

export default router;
