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

// 방 조회 하는 함수
const getRoom = asyncHandler(async (req, res) => {
    const { id } = req.query; // URL 쿼리 파라미터 'id'를 가져옴 (예: ?id=...)
    const rooms = await Room.find({
        participants: id,
    });
    res.status(200).json({ rooms: rooms });
});

export { createRoom, getRoom };
