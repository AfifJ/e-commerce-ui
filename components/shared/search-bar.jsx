"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Reusable search bar component
export default function SearchBar({ placeholder = "Cari produk...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder={placeholder}
        className="pl-10 pr-4 w-full border-gray-300 focus:border-black"
      />
    </div>
  );
}