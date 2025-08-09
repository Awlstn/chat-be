import Message from "../models/Message.js";

const registerSocketEvents = (io) => {
    io.on("connection", async (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("message", async (message) => {
            console.log("넘어온 메세지 : ", message);
        });

        //
        socket.on("joinRoom", (roomId) => {
            socket.join(roomId); // socket.io가 내부적으로 이 socket을 roomId 그룹에 넣음
        });

        socket.on("sendMessage", async (data) => {
            const savedMessage = await Message.create({
                roomId: data.roomId,
                sender: data.sender,
                content: data.content,
            });
            // 2. 저장된 메시지를 다시 불러와서 sender 필드(user 정보)를 populate
            const populatedMessage = await Message.findById(
                savedMessage._id,
            ).populate("sender", "userId");

            // 3. 방에 있는 모든 소켓에 populate된 메시지 전송
            io.to(data.roomId).emit("receiveMessage", populatedMessage);
        });
    });
};

export default registerSocketEvents;
