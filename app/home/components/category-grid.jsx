"use client";

import { categories } from "@/data/mock-data";
import CategoryCard from "./category-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CategoryGrid() {
  // Display first 6 categories on homepage
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Jelajahi Koleksi Kami
            </h2>
            <p className="text-gray-600 mt-2">
              Temukan produk yang sesuai dengan kebutuhan Anda
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            Lihat Semua Kategori
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 md:hidden">
          <Button variant="outline" className="w-full">
            Lihat Semua Kategori
          </Button>
        </div>
      </div>
    </section>
  );
}