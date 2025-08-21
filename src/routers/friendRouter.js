import express from "express";
import checkLogin from "../utils/checkLogin.js";
import { sendFriendRequest } from "../controllers/friendController.js";

const router = express.Router();

router.route("/request").post(checkLogin, sendFriendRequest);

export default router;
