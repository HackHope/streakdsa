import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        url: { type: String }, // leetcode link
        topic: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Easy",
        },
        companyTags: [String],
        platform: { type: String, default: "LeetCode" }, // Codeforces, GFG, etc.
    },
    { timestamps: true }
);

export default mongoose.models.Problem ||
    mongoose.model("Problem", ProblemSchema);
