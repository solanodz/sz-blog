import mongoose, { Schema } from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    // TODO --> category: { type: String, required: true },
    content: { type: String, required: true },
    cover: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })


export default mongoose.model("Post", PostSchema)