import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            comment: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
