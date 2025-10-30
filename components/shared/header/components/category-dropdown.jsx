"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/data/mock-data";
import * as Icons from "lucide-react";

// Category dropdown dengan mega menu style
export default function CategoryDropdown() {
  return (
    <nav className="border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 py-3 overflow-x-auto">
          {/* All Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1 hover:text-black">
                <span>Semua Kategori</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((category) => {
                const IconComponent = Icons[category.icon] || Icons.Package;
                return (
                  <DropdownMenuItem key={category.id} className="flex items-center space-x-3">
                    <IconComponent className="w-4 h-4" />
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">
                        {category.subcategories.slice(0, 3).join(", ")}
                      </div>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Quick Category Links */}
          {categories.slice(0, 5).map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="whitespace-nowrap hover:text-black hover:bg-gray-50"
            >
              {category.name}
            </Button>
          ))}

          {/* Flash Sale Link */}
          {/* <Button
            variant="ghost"
            className="whitespace-nowrap text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
          >
            🔥 Flash Sale
          </Button> */}
        </div>
      </div>
    </nav>
  );
}