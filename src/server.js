// 외부 모듈
import { createServer } from "http";

// 내부 모듈
import app from "./app.js";
import dbConnect from "./config/dbConnect.js";

dbConnect(); // DB 연결

const httpServer = createServer(app);

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`); // 서버가 실행 중인 포트를 출력합니다.
});
