import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true, // 필수 항목
            unique: true, // 중복 방지
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema); // 스키마를 바탕으로 모델 생성
export default User;
