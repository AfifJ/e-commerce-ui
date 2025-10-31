import Breadcrumb from "@/components/shared/breadcrumb";

export default function VendorBreadcrumb({ vendor }) {
  const breadcrumbItems = [
    {
      label: "Toko",
      href: "/vendor"
    },
    {
      label: vendor?.name || "Toko",
      href: null // Current page, not clickable
    }
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}