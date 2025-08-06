import express from "express";
import dotenv from "dotenv";

import authRouter from "../src/routers/authRouter.js";

dotenv.config(); // .env 파일의 환경 변수를 로드합니다.

const app = express();
app.use(express.json());
app.use("/chat", authRouter);

export default app;
