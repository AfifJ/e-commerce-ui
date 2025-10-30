"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ product }) {
  return (
    <nav className="flex items-center space-x-2 px-4 container mx-auto text-sm text-gray-600 py-4 border-b border-gray-200">
      <Link
        href="/"
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      <ChevronRight className="w-4 h-4 text-gray-400" />

      <Link
        href={`/kategori/${product.category.toLowerCase()}`}
        className="hover:text-blue-600 transition-colors"
      >
        {product.category}
      </Link>

      <ChevronRight className="w-4 h-4 text-gray-400" />

      <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
        {product.name}
      </span>
    </nav>
  );
}