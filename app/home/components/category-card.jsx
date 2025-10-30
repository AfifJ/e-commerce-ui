"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/kategori/${category.slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Background Image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 opacity-90" />

        {/* Category Name Overlay */}
        <div className="absolute top-4 left-4 right-4">
          <h3 className="font-bold text-white text-lg drop-shadow-lg group-hover:text-blue-300 transition-colors duration-300">
            {category.name}
          </h3>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}