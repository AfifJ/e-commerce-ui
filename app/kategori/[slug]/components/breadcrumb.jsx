import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ category }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Kategori</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">{category?.name || 'Semua Produk'}</span>
        </nav>
      </div>
    </div>
  );
}