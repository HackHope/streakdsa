import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongoose";
import DailyLog from "../../../models/DailyLog";

export default async function handler(req, res) {
    await dbConnect();
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const logs = await DailyLog.find({ userId: session.user.id });

    let total = 0;
    const diff = { easy: 0, medium: 0, hard: 0, unknown: 0 };
    const dateSet = new Set();

    logs.forEach(log => {
        total += log.questions.length;
        dateSet.add(log.date);
        log.questions.forEach(q => diff[q.difficulty]++);
    });

    const avg = total / logs.length || 0;

    // Streak calculation
    let streak = 0;
    let currentDate = new Date();

    while (true) {
        const d = currentDate.toISOString().split("T")[0];
        if (dateSet.has(d)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else break;
    }

    res.status(200).json({ total, diff, avg, streak });
}
