import asyncHandler from "express-async-handler";
import Room from "../models/Room";

// 방 만드는 함수
const createRoom = asyncHandler(async (res, req) => {
    const { name, type, id } = req.body;
    const room = await Room.create({
        name,
        type,
        participants: [id],
    });
    return res.status(201).json({ message: "채팅방이 만들어졌습니다." });
});

export { createRoom };
