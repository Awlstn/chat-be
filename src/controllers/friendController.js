import asyncHandler from "express-async-handler";
import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";
import { getIO } from "../utils/socketServer.js";

// 친구 요청 시
const sendFriendRequest = asyncHandler(async (req, res) => {
    const { receiver } = req.body;
    const senderId = req.id;
    const sender = await User.findById(senderId);

    // 친구 요청 보낸 사람과 받는 사람이 같은 경우
    if (sender.userId === receiver) {
        return res
            .status(400)
            .json({ message: "자기 자신에게 요청할 수 없습니다." });
    }

    const recv = await User.findOne({ userId: receiver });

    // 요청 보낼 상대방이 없으면
    if (!recv) {
        return res
            .status(404)
            .json({ message: "요청 받는 사용자가 없습니다." });
    }

    // 이미 친구인 경우
    if (sender.friends.includes(recv._id)) {
        return res.status(409).json({ message: "이미 친구입니다." });
    }

    // 요청을 보낸 상태이면
    const existingRequest = await FriendRequest.findOne({
        sender: sender._id,
        receiver: recv._id,
        status: "pending",
    });
    if (existingRequest) {
        return res.status(409).json({ message: "이미 요청을 보냈습니다." });
    }

    // 친구 요청 정보 생성
    await FriendRequest.create({
        sender: sender._id,
        receiver: recv._id,
        status: "pending",
    });

    res.status(201).json({ message: "친구 요청 생성" });

    // 요청 받는 사용자가 온라인 일 경우
    if (recv.status === "online") {
        const io = getIO();
        const senderInfo = {
            id: senderId,
            sender: sender.userId,
        };
        io.to(recv.socketId).emit("friendRequest", senderInfo);
    }
});

const getFriendRequest = asyncHandler(async (req, res) => {
    const id = req.id;
    const requests = await FriendRequest.find({ receiver: id })
        .populate("sender", "userId") // 👈 userId만 가져옴
        .sort({ createdAt: -1 });

    res.status(200).json({ requests: requests });
});

export { sendFriendRequest, getFriendRequest };
