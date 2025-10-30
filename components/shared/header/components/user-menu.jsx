"use client";

import { User, LogIn, Package, Heart, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// User account dropdown menu
export default function UserMenu() {
  // Mock user state - ganti dengan authentication logic
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <Button variant="ghost" className="flex items-center space-x-2">
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Masuk</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">Akun</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="flex items-center space-x-3">
          <User className="w-4 h-4" />
          <span>Profil Saya</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center space-x-3">
          <Package className="w-4 h-4" />
          <span>Pesanan</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center space-x-3">
          <Heart className="w-4 h-4" />
          <span>Wishlist</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center space-x-3">
          <Settings className="w-4 h-4" />
          <span>Pengaturan</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center space-x-3">
          <LogOut className="w-4 h-4" />
          <span>Keluar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}