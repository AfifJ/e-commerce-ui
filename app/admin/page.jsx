import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NotFound from "../not-found";

export default async function AdminPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session?.user?.role === "admin") {
    redirect("/admin/dashboard");
  } else if (session?.user?.role !== "admin") {
    return <NotFound />
  }

  return <div>Redirecting ... </div>
}