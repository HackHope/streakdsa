import { useState } from "react";
import axios from "axios";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }

    return { props: {} };
};

export default function Signup() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [err, setErr] = useState("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        setErr("");

        try {
            // Create user
            await axios.post("/api/auth/signup", form);

            // Automatically sign in
            const res = await signIn("credentials", {
                redirect: false,
                email: form.email,
                password: form.password,
            });

            if (res?.error) {
                setErr("Sign in failed");
                return;
            }

            router.push("/dashboard");
        } catch (e: any) {
            setErr(e?.response?.data?.error || "Signup failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-sm bg-gray-900 p-6 rounded-xl shadow-lg space-y-6">

                <h1 className="text-2xl font-semibold text-center">
                    Create Account
                </h1>

                {err && (
                    <div className="bg-red-600/20 text-red-400 text-sm px-3 py-2 rounded-md">
                        {err}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="text-sm text-gray-300">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-xs text-gray-500 text-center">
                    Already have an account?
                    <a href="/auth/signin" className="text-indigo-400 hover:underline ml-1">
                        Sign In
                    </a>
                </p>

            </div>
        </div>
    );
}
