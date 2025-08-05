// 외부 모듈
import { createServer } from "http";

// 내부 모듈
import app from "./app.js";

const httpServer = createServer(app);

httpServer.listen(5001, () => {
    console.log("Server is running"); //서버가 실행 중인 포트를 출력합니다.
});
