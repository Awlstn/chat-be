import asyncHandler from "express-async-handler";
import Room from "../models/Room.js";

// 방 만드는 함수
const createRoom = asyncHandler(async (req, res) => {
    const { name, type, id } = req.body;
    const room = await Room.create({
        name,
        type,
        participants: [id],
    });
    return res
        .status(201)
        .json({ message: "채팅방이 만들어졌습니다.", roomId: room._id });
});

export { createRoom };
