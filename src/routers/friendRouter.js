import express from "express";
import checkLogin from "../utils/checkLogin.js";
import {
    sendFriendRequest,
    getFriendRequest,
} from "../controllers/friendController.js";

const router = express.Router();

router
    .route("/request")
    .post(checkLogin, sendFriendRequest)
    .get(checkLogin, getFriendRequest);

export default router;
