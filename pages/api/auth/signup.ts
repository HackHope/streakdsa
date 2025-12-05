// pages/api/auth/signup.ts
import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import type { NextApiRequest, NextApiResponse } from "next";

interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
}

interface ApiSuccess {
    ok: true;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface ApiError {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccess | ApiError>
) {
    if (req.method !== "POST") return res.status(405).end();

    const { name, email, password } = req.body as SignupRequestBody;
    if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });

    await dbConnect;

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash }) as { _id: string; name: string; email: string };
    return res.status(201).json({ ok: true, user: { id: user._id, name: user.name, email: user.email } });
}
