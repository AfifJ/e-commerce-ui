"use client";

import Breadcrumb from "@/components/shared/breadcrumb";

export default function ProductBreadcrumb({ product }) {
  const breadcrumbItems = [
    {
      label: product.category,
      href: `/kategori/${product.category.toLowerCase().replace(/\s+/g, '-')}`
    },
    {
      label: product.name,
      href: null // Current page, not clickable
    }
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}