"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ShoppingCart, Heart, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function AuthLayout({ children, title, subtitle, showBackButton = true }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/auth/login";

  return (
    <div className="min-h-screen bg-background">
      {/* Auth Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding (Desktop) */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary to-primary/80 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 auth-branding-pattern">
            <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]`}></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4">PREMIUM</h1>
              <p className="text-xl opacity-90 max-w-md">
                Temukan produk berkualitas tinggi dengan pengalaman berbelanja yang premium
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center space-x-4 animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center transition-all hover:bg-white/30">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Belanja Mudah</h3>
                  <p className="text-sm opacity-80">Proses checkout yang cepat dan aman</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center transition-all hover:bg-white/30">
                  <Heart className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Wishlist Personal</h3>
                  <p className="text-sm opacity-80">Simpan produk favorit Anda</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center transition-all hover:bg-white/30">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold">Akun Pribadi</h3>
                  <p className="text-sm opacity-80">Kelola pesanan dan profil Anda</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">PREMIUM</h1>
              <p className="text-muted-foreground">{subtitle}</p>
            </div>

            {/* Back Button */}
            {showBackButton && (
              <div className="mb-6">
                <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Beranda
                </Link>
              </div>
            )}

            {/* Form Container */}
            <Card className="w-full animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
              </CardHeader>

              <CardContent>
                {children}
              </CardContent>

              <CardFooter className="flex-col">
                <div className="w-full text-center border-t pt-6">
                  <p className="text-muted-foreground">
                    {isLoginPage ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                    <Link
                      href={isLoginPage ? "/auth/register" : "/auth/login"}
                      className="font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                      {isLoginPage ? "Daftar sekarang" : "Masuk"}
                    </Link>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}