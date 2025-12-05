import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!session) router.push("/auth/signin");
    }, [session]);

    if (!session) return null;
    return (
        <div className="p-4">
            <h1 className="text-2xl">Welcome, {session.user?.name}</h1>
            <p className="mt-4">This is the dashboard placeholder. Next: Daily log APIs & UI</p>
        </div>
    );
}
