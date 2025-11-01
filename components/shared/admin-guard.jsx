import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { formatUserWithRole } from "@/lib/role-utils";

export default async function AdminGuard({ children }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Format user with role information
  const user = formatUserWithRole(session?.user);

  // Jika user adalah admin dan sedang mengakses halaman non-admin
  if (user?.role === "admin") {
    redirect("/admin/dashboard");
  }

  return <>{children}</>;
}