import asyncHandler from "express-async-handler";
import Message from "../models/Message.js";

// 특정 채팅방 메세지 기록 조회
const getRoomMessages = asyncHandler(async (req, res) => {
    const { roomId } = req.query;
    const roomMessages = await Message.find({
        roomId,
    }).populate("sender", "userId");
    res.status(200).json({ roomMessages: roomMessages });
});

export { getRoomMessages };
