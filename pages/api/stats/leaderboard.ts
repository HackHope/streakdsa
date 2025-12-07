import dbConnect from "../../../lib/mongoose";
import DailyLog from "../../../models/DailyLog";
import User from "../../../models/User";

export default async function handler(req, res) {
    await dbConnect();

    const users = await User.find();

    const leaderboard = [];

    for (let u of users) {
        const logs = await DailyLog.find({ userId: u._id });
        const total = logs.reduce((sum, l) => sum + l.questions.length, 0);
        leaderboard.push({ user: u.name, total });
    }

    leaderboard.sort((a, b) => b.total - a.total);

    res.status(200).json({ leaderboard });
}
