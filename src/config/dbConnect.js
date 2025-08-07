import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("MongoDB에 연결되었습니다.");
});

export default connectDB;
