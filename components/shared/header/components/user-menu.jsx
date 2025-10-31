"use client";

import { User, LogIn, Package, Heart, Settings, LogOut, CheckCircle, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/stores/auth-store";

// User account dropdown menu
export default function UserMenu() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <Button variant="ghost" className="flex items-center space-x-2" disabled>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span className="hidden sm:inline">Loading...</span>
      </Button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href="/auth/login">
        <Button variant="ghost" className="flex items-center space-x-2">
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline">Masuk</span>
        </Button>
      </Link>
    );
  }

  // Get role display name
  const getRoleDisplayName = (role) => {
    const roleNames = {
      buyer: "Buyer",
      admin: "Admin",
      vendor: "Vendor",
      sales: "Sales",
      mitra: "Mitra"
    };
    return roleNames[role] || "Buyer";
  };

  // Get role color
  const getRoleColor = (role) => {
    const roleColors = {
      admin: "bg-red-100 text-red-800 border-red-200",
      vendor: "bg-purple-100 text-purple-800 border-purple-200",
      sales: "bg-blue-100 text-blue-800 border-blue-200",
      mitra: "bg-orange-100 text-orange-800 border-orange-200",
      buyer: "bg-green-100 text-green-800 border-green-200"
    };
    return roleColors[role] || roleColors.buyer;
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span className="hidden sm:inline">
            {user?.name?.split(' ')[0] || 'Akun'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {/* User Info Header */}
        <div className="px-2 py-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
          {/* Role Badge */}
          <div className="mt-2 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user?.role)}`}>
              {getRoleDisplayName(user?.role)}
              {user?.emailVerified && <CheckCircle className="w-3 h-3" />}
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <DropdownMenuItem asChild>
            <Link href="/account/profile" className="flex items-center space-x-3">
              <User className="w-4 h-4" />
              <span>Profil Saya</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/account/orders" className="flex items-center space-x-3">
              <Package className="w-4 h-4" />
              <span>Pesanan</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/wishlist" className="flex items-center space-x-3">
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </Link>
          </DropdownMenuItem>

          {/* Admin Portal Link - Only for admin users */}
          {user?.role === 'admin' && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard" className="flex items-center space-x-3 text-red-600 hover:text-red-700">
                  <Shield className="w-4 h-4" />
                  <span>Admin Portal</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/account/settings" className="flex items-center space-x-3">
              <Settings className="w-4 h-4" />
              <span>Pengaturan</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="flex items-center space-x-3 text-red-600 focus:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}