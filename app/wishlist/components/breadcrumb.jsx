import Breadcrumb from "@/components/shared/breadcrumb";

export default function WishlistBreadcrumb() {
  const breadcrumbItems = [
    {
      label: "Wishlist",
      href: null // Current page, not clickable
    }
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}