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
  ChevronRight,
  Star,
  TrendingUp,
  Grid,
  List
} from "lucide-react";
import Header from "@/components/shared/header/components/header";

export default function AllCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Mock data untuk kategori
  const allCategories = [
    {
      id: 1,
      name: "Elektronik",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=center",
      productCount: 1248,
      description: "Gadget dan perangkat elektronik terkini",
      subcategories: [
        { name: "Smartphone", count: 456 },
        { name: "Laptop", count: 234 },
        { name: "Tablet", count: 123 },
        { name: "Smartwatch", count: 89 },
        { name: "Audio", count: 346 }
      ],
      isHot: true,
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Fashion",
      icon: Shirt,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center",
      productCount: 3456,
      description: "Pakaian dan aksesoris fashion terkini",
      subcategories: [
        { name: "Pakaian Pria", count: 1234 },
        { name: "Pakaian Wanita", count: 1567 },
        { name: "Sepatu", count: 456 },
        { name: "Tas", count: 123 },
        { name: "Aksesoris", count: 76 }
      ],
      color: "bg-purple-500"
    },
    {
      id: 3,
      name: "Rumah Tangga",
      icon: Home,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      productCount: 892,
      description: "Perlengkapan dan dekorasi rumah",
      subcategories: [
        { name: "Dekorasi", count: 234 },
        { name: "Perabot", count: 345 },
        { name: "Dapur", count: 189 },
        { name: "Kamar Mandi", count: 78 },
        { name: "Taman", count: 46 }
      ],
      isTrending: true,
      color: "bg-green-500"
    },
    {
      id: 4,
      name: "Otomotif",
      icon: Car,
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop&crop=center",
      productCount: 567,
      description: "Aksesoris dan perawatan kendaraan",
      subcategories: [
        { name: "Mobil", count: 234 },
        { name: "Motor", count: 189 },
        { name: "Aksesoris", count: 123 },
        { name: "Perawatan", count: 21 }
      ],
      color: "bg-red-500"
    },
    {
      id: 5,
      name: "Gaming",
      icon: Gamepad2,
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop&crop=center",
      productCount: 789,
      description: "Perangkat gaming dan aksesoris",
      subcategories: [
        { name: "Console", count: 123 },
        { name: "PC Gaming", count: 234 },
        { name: "Aksesoris", count: 345 },
        { name: "Game", count: 87 }
      ],
      isHot: true,
      color: "bg-indigo-500"
    },
    {
      id: 6,
      name: "Buku & Alat Tulis",
      icon: Book,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
      productCount: 2345,
      description: "Buku, majalah, dan alat tulis",
      subcategories: [
        { name: "Buku", count: 1234 },
        { name: "Alat Tulis", count: 678 },
        { name: "Majalah", count: 234 },
        { name: "E-Book", count: 199 }
      ],
      color: "bg-yellow-500"
    },
    {
      id: 7,
      name: "Kesehatan & Kecantikan",
      icon: Heart,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center",
      productCount: 1567,
      description: "Produk kesehatan dan kecantikan",
      subcategories: [
        { name: "Skincare", count: 567 },
        { name: "Makeup", count: 345 },
        { name: "Kesehatan", count: 456 },
        { name: "Perawatan", count: 199 }
      ],
      isTrending: true,
      color: "bg-pink-500"
    },
    {
      id: 8,
      name: "Kamera",
      icon: Camera,
      image: "https://images.unsplash.com/photo-1516035069371-2981d14848aa?w=400&h=300&fit=crop&crop=center",
      productCount: 445,
      description: "Kamera dan perlengkapannya",
      subcategories: [
        { name: "DSLR", count: 123 },
        { name: "Mirrorless", count: 89 },
        { name: "Action Cam", count: 67 },
        { name: "Aksesoris", count: 166 }
      ],
      color: "bg-teal-500"
    },
    {
      id: 9,
      name: "Audio",
      icon: Headphones,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&crop=center",
      productCount: 678,
      description: "Headphone, speaker, dan audio system",
      subcategories: [
        { name: "Headphone", count: 234 },
        { name: "Speaker", count: 189 },
        { name: "Audio System", count: 123 },
        { name: "Aksesoris", count: 132 }
      ],
      color: "bg-orange-500"
    },
    {
      id: 10,
      name: "Smartwatch",
      icon: Watch,
      image: "https://images.unsplash.com/photo-1523275335684-e5db3bdc6a86?w=400&h=300&fit=crop&crop=center",
      productCount: 334,
      description: "Jam pintar dan aksesorisnya",
      subcategories: [
        { name: "Apple Watch", count: 89 },
        { name: "Samsung Watch", count: 67 },
        { name: "Smartband", count: 123 },
        { name: "Aksesoris", count: 55 }
      ],
      color: "bg-cyan-500"
    },
    {
      id: 11,
      name: "Tablet",
      icon: Tablet,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center",
      productCount: 223,
      description: "Tablet dan aksesoris",
      subcategories: [
        { name: "iPad", count: 67 },
        { name: "Samsung Tab", count: 45 },
        { name: "Android Tablet", count: 78 },
        { name: "Aksesoris", count: 33 }
      ],
      color: "bg-lime-500"
    },
    {
      id: 12,
      name: "Lainnya",
      icon: Package,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center",
      productCount: 890,
      description: "Berbagai produk lainnya",
      subcategories: [
        { name: "Mainan", count: 234 },
        { name: "Hobi", count: 189 },
        { name: "Olahraga", count: 267 },
        { name: "Lainnya", count: 200 }
      ],
      color: "bg-gray-500"
    }
  ];

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
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium text-gray-900">Semua Kategori</span>
          </nav>
        </div>
      </div>

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
                        <category.icon className="w-5 h-5" />
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
                        <category.icon className="w-4 h-4" />
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