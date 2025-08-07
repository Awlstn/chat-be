import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// 회원가입 signupUser - POST
const signupUser = asyncHandler(async (req, res) => {
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

// 로그인 loginUser - POST
const loginUser = asyncHandler(async (req, res) => {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId: userId });

    if (!user) {
        return res.status(404).json({ message: "일치하는 사용자가 없습니다." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res
            .status(401)
            .json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
    });
    res.status(200).json({ message: "로그인 성공" });
});

export { signupUser, loginUser };
