import { verifyToken } from "../utils/jwt.js";

const checkLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
    }

    req.userId = decoded.userId;
    next();
};

export default checkLogin;
