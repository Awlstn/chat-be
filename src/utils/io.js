const registerSocketEvents = (io) => {
    io.on("connection", async (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("message", async (message) => {
            console.log("넘어온 메세지 : ", message);
        });
    });
};

export default registerSocketEvents;
