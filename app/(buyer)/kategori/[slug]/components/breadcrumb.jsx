import Breadcrumb from "@/components/shared/breadcrumb";

export default function CategoryBreadcrumb({ category }) {
  const breadcrumbItems = [
    {
      label: "Kategori",
      href: "/kategori"
    },
    {
      label: category?.name || "Semua Produk",
      href: null // Current page, not clickable
    }
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}