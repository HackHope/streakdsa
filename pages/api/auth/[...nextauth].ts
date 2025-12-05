import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongoose";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                // Ensure DB connection
                await dbConnect();

                const user = await User.findOne({ email: credentials.email }).lean();

                if (!user) {
                    return null;
                }

                const valid = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!valid) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user._id = token.id as string;
            }
            return session;
        }
    },

    pages: {
        signIn: "/auth/signin",
    },

    secret: process.env.NEXTAUTH_SECRET,
});
