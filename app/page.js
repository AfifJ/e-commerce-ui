import HomePage from "./home/page";
import AdminGuard from "@/components/shared/admin-guard";

export default function Home() {
  return (
    <AdminGuard>
      <HomePage />
    </AdminGuard>
  );
}
