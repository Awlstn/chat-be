// 외부 모듈
import { createServer } from "http";

// 내부 모듈
import app from "./app.js";
import dbConnect from "./config/dbConnect.js";
import { initSocket } from "./utils/socketServer.js";
import registerSocketEvents from "./utils/io.js";

dbConnect(); // DB 연결

const httpServer = createServer(app);

const io = initSocket(httpServer);
registerSocketEvents(io);

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`); // 서버가 실행 중인 포트를 출력합니다.
});
