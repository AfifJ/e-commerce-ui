"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  Car,
  Gamepad2,
  Book,
  Heart,
  Camera,
  Headphones,
  Watch,
  Tablet,
  Package,
  Star,
  TrendingUp,
  Grid,
  List,
  ChevronRight
} from "lucide-react";
import { allCategories } from "@/data/mock-data";
import Header from "@/components/shared/header/components/header";
import Breadcrumb from "@/components/shared/breadcrumb";

export default function AllCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Menggunakan data dari mock-data.js

  // Helper function untuk mapping icon names ke components
  const getIconComponent = (iconName) => {
    const icons = {
      Smartphone: Smartphone,
      Shirt: Shirt,
      Home: Home,
      Car: Car,
      Gamepad2: Gamepad2,
      Book: Book,
      Heart: Heart,
      Camera: Camera,
      Headphones: Headphones,
      Watch: Watch,
      Tablet: Tablet,
      Package: Package,
      default: Package
    };
    return icons[iconName] || icons.default;
  };

  // Filter kategori berdasarkan search term
  const filteredCategories = allCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Breadcrumb */}
      <Breadcrumb items={[
        {
          label: 'Kategori',
          href: null // Current page, not clickable
        }
      ]} />

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Semua Kategori</h1>
              <p className="text-gray-600">
                Jelajahi {allCategories.length} kategori dengan lebih dari 12.000 produk
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Cari kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Menampilkan {filteredCategories.length} dari {allCategories.length} kategori
          </div>
          <div className="flex border rounded-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Grid/List */}
        {filteredCategories.length > 0 ? (
          <div className={`
            ${viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
            }
          `}>
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/kategori/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`
                  ${viewMode === "grid"
                    ? "group bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden"
                    : "group bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4"
                  }
                `}
              >
                {viewMode === "grid" ? (
                  <>
                    {/* Grid View */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />

                      {/* Category Icon */}
                      <div className={`absolute top-3 left-3 ${category.color} bg-opacity-90 text-white rounded-full p-2`}>
                        {(() => {
                          const IconComponent = getIconComponent(category.icon);
                          return <IconComponent className="w-5 h-5" />;
                        })()}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {category.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {category.productCount} produk
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="96px"
                      />
                      <div className={`absolute top-2 left-2 ${category.color} bg-opacity-90 text-white rounded-full p-1.5`}>
                        {(() => {
                          const IconComponent = getIconComponent(category.icon);
                          return <IconComponent className="w-4 h-4" />;
                        })()}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                            {category.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{category.productCount} produk</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors ml-4" />
                      </div>
                    </div>
                  </>
                )}
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada kategori ditemukan
            </h3>
            <p className="text-gray-600 mb-4">
              Coba kata kunci pencarian yang berbeda
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
            >
              Hapus Pencarian
            </Button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Tidak menemukan yang Anda cari?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Jelajahi ribuan produk lainnya di berbagai kategori
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            asChild
          >
            <Link href="/products">
              Lihat Semua Produk
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}