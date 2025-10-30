"use client";

import { products } from "@/data/mock-data";
import ProductGrid from "./product-grid";

export default function FeaturedProducts() {
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <ProductGrid
      title="Produk Terlaris"
      subtitle="Temukan produk-produk paling populer minggu ini"
      products={featuredProducts}
      viewAllLink="/produk/terlaris"
      viewAllText="Lihat Semua Produk Terlaris"
    />
  );
}