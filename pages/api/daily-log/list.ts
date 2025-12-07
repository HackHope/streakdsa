import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "../../../lib/mongoose";
import DailyLog from "../../../models/DailyLog";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

    await dbConnect();
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });

    const logs = await DailyLog.find({ userId: session.user.id }).sort({ date: -1 });

    res.status(200).json({ logs });
}
