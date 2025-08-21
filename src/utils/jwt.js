import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, jwtSecretKey); // 성공하면 payload 반환
    } catch (err) {
        return null; // 실패하면 null
    }
};
