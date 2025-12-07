import mongoose from "mongoose";

const UserProgressSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        problem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem",
            required: true,
        },

        status: {
            type: String,
            enum: ["Not Started", "Solved", "Attempted", "Revisit"],
            default: "Not Started",
        },

        attempts: { type: Number, default: 0 },
        lastAttemptedAt: { type: Date },
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.models.UserProgress ||
    mongoose.model("UserProgress", UserProgressSchema);
