import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "../src/routers/authRouter.js";
import chatRouter from "../src/routers/chatRouter.js";
import messageRouter from "../src/routers/messageRouter.js";
import friendRouter from "../src/routers/friendRouter.js";
import cookieParser from "cookie-parser";

dotenv.config(); // .env 파일의 환경 변수를 로드합니다.

const app = express();
app.use(express.json());
app.use(
    cors(
        { origin: "http://localhost:5173", credentials: true }, // 클라이언트의 도메인을 지정합니다.
    ),
);
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/friend", friendRouter);

export default app;
