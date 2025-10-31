import AdminGuard from "@/components/shared/admin-guard";

export default function BuyerLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}