import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    title: String,
    platform: String,
    level: { type: String, enum: ["easy", "medium", "hard", "unknown"], default: "unknown" },
    notes: String
});

const DailyLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    questions: { type: [QuestionSchema], default: [] },
    totalForDay: { type: Number, default: 0 }
});

export default mongoose.models.DailyLog || mongoose.model("DailyLog", DailyLogSchema);
