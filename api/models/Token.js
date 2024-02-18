import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 },  // 1 hr
})

export default mongoose.model("Token", TokenSchema)