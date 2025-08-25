import { verifyToken } from "../utils/jwt.js";

const checkLogin = (req, res, next) => {
    // 쿠키 대신 Authorization 헤더에서 가져오기
    const authHeader = req.headers.authorization; // "Bearer <token>"
    if (!authHeader) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const token = authHeader.split(" ")[1]; // "Bearer " 제거
    if (!token) {
        return res.status(401).json({ message: "토큰이 존재하지 않습니다." });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }
    req.id = decoded.id;
    next();
};

export default checkLogin;
