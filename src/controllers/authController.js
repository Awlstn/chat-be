import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// 회원가입 signup - POST
const singupUser = asyncHandler(async (req, res) => {
    const { userId, password } = req.body;

    if (await User.findOne({ userId: userId })) {
        return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        userId: userId,
        password: hashedPassword,
    });

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
});

export { singupUser };
