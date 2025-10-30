"use client";

import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProductGrid({
  title,
  subtitle,
  products,
  viewAllLink,
  viewAllText = "Lihat Semua"
}) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-600 mt-2">
                {subtitle}
              </p>
            )}
          </div>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="outline" className="hidden md:flex items-center gap-2">
                {viewAllText}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        {viewAllLink && (
          <div className="mt-6 md:hidden">
            <Link href={viewAllLink}>
              <Button variant="outline" className="w-full">
                {viewAllText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}