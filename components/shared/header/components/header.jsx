"use client";

import { useState, useEffect } from "react";
import { Menu, Zap, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
// import SearchBar from "@/components/search-bar";
// import WishlistButton from "@/components/wishlist-button";
import { categories } from "@/data/mock-data";
import * as Icons from "lucide-react";
import CategoryDropdown from "./category-dropdown";
import UserMenu from "./user-menu";
import CartButton from "../../cart-button";
import SearchBar from "../../search-bar";
import WishlistButton from "../../wishlist-button";
import MobileMenu from "./mobile-menu";

// Header component dengan navigasi lengkap
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Top bar - promosi atau info */}
        <div className="bg-black text-white text-xs text-center py-2 responsive-top-bar">
          <p className="hidden sm:block">
            Gratis ongkir untuk pembelian minimal Rp 100.000 | Garansi 100% Original
          </p>
          <p className="sm:hidden">
            <span>Gratis ongkir min. Rp 100k</span>
            <span className="block">Garansi 100% Original</span>
          </p>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">PREMIUM</h1>

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

              {/* Flash Sale Button */}
              <Button
                variant="ghost"
                className="whitespace-nowrap text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
              >
                <Zap className="w-4 h-4" />
                Flash Sale
              </Button>
            </div>

            {/* Search bar - desktop only */}
            <div className="flex-1 max-w-lg mx-8">
              <SearchBar />
            </div>

            {/* Navigation items */}
            <div className="flex items-center space-x-4">
              {/* User menu */}
              <UserMenu />

              {/* Wishlist */}
              <WishlistButton itemCount={3} />

              {/* Cart */}
              <CartButton itemCount={5} />
            </div>
          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between h-16">
            {/* Mobile Logo and Menu Button */}
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="w-10 h-10"
              >
                <Menu className="w-5 h-5" />
              </Button>

              {/* Logo */}
              <h1 className="text-xl font-bold text-black">PREMIUM</h1>
            </div>

            {/* Mobile Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Wishlist */}
              <WishlistButton itemCount={3} />

              {/* Cart */}
              <CartButton itemCount={5} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        categories={categories}
      />
    </>
  );
}