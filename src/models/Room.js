import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        name: String,
        type: {
            type: String,
            enum: ["private", "group"],
            required: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
