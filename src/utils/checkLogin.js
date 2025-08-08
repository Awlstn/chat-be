import jwt from "jsonwebtoken";

const checkLogin = (req, res, next) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "로그인이 필요합니다." }); // 401 Unauthorized: 인증 필요
    }
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "유효하지 않은 토큰입니다." }); // 403 Forbidden: 권한 없음
        }
        req.userId = decoded.userId;
        next();
    });
};

export default checkLogin;
