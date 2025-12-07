import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongoose";
import DailyLog from "../../../models/DailyLog";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    await dbConnect();
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const { date, questions } = req.body;

    if (!date || !questions) return res.status(400).json({ error: "Missing fields" });

    let log = await DailyLog.findOne({ userId: session.user.id, date });

    if (!log) {
        log = await DailyLog.create({
            userId: session.user.id,
            date,
            questions
        });
    } else {
        log.questions.push(...questions);
        await log.save();
    }

    res.status(200).json({ message: "Daily log updated", log });
}
