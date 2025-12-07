import mongoose from "mongoose";

const DailyLogSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        date: {
            type: String, // “2025-01-10” (string for easy uniqueness)
            required: true,
            unique: false,
        },

        problemsSolved: [
            {
                problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
                timeTaken: Number, // in minutes
                notes: String,
                status: {
                    type: String,
                    enum: ["Solved", "Attempted", "Skipped"],
                    default: "Solved",
                },
            },
        ],

        streakCount: { type: Number, default: 1 },
    },
    { timestamps: true }
);

export default mongoose.models.DailyLog ||
    mongoose.model("DailyLog", DailyLogSchema);
