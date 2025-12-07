import mongoose from "mongoose";

const TopicProgressSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        topic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
        },

        mastered: { type: Number, default: 0 }, // solved problems in topic
        total: { type: Number, default: 0 },    // total problems in topic
    },
    { timestamps: true }
);

export default mongoose.models.TopicProgress ||
    mongoose.model("TopicProgress", TopicProgressSchema);
