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
            console.log(data);
            const savedMessage = await Message.create({
                roomId: data.roomId,
                sender: data.sender,
                content: data.content,
            });
            io.to(data.roomId).emit("receiveMessage", savedMessage);
        });
    });
};

export default registerSocketEvents;
