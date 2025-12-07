import dbConnect from "../../../lib/mongoose";
import Problem from "../../../models/Problem";

export default async function handler(req, res) {
    await dbConnect();

    const problems = await Problem.find().sort({ createdAt: -1 });

    res.status(200).json({ problems });
}
