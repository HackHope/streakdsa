import dbConnect from "../../../lib/mongoose";
import Problem from "../../../models/Problem";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    await dbConnect();

    const { title, difficulty, topic } = req.body;

    const problem = await Problem.create({ title, difficulty, topic });

    res.status(200).json({ problem });
}
