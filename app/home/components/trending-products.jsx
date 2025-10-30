"use client";

import { products } from "@/data/mock-data";
import ProductGrid from "./product-grid";

export default function TrendingProducts() {
  // Get products 5-8 as trending
  const trendingProducts = products.slice(4, 8);

  return (
    <ProductGrid
      title="Sedang Tren"
      subtitle="Produk yang lagi populer dan banyak dibicarakan"
      products={trendingProducts}
      viewAllLink="/produk/trending"
      viewAllText="Lihat Semua Produk Trending"
    />
  );
}