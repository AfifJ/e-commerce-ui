import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminGuard({ children }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Jika user adalah admin dan sedang mengakses halaman non-admin
  if (session?.user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  return <>{children}</>;
}