import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NotFound from "../not-found";

export default async function AdminPage({ children }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (session?.user?.role === "admin") {
        return <>{children}</>
    }

    return <NotFound />
}