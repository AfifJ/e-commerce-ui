"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/header/components/header";
import Footer from "./home/components/footer";
import {
    Search,
    ShoppingCart,
    Package,
    ArrowLeft,
    Home,
    ShoppingBag,
    HelpCircle
} from "lucide-react";

export default function NotFound() {

    const quickLinks = [
        {
            icon: Home,
            label: "Beranda",
            href: "/"
        },
        {
            icon: ShoppingBag,
            label: "Semua Produk",
            href: "/produk"
        },
        {
            icon: Package,
            label: "Kategori",
            href: "/kategori"
        },
        {
            icon: ShoppingCart,
            label: "Keranjang",
            href: "/cart"
        },
        {
            icon: HelpCircle,
            label: "Bantuan",
            href: "/help"
        }
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-1">
                <div className="container mx-auto px-4 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto text-center">

                        {/* 404 Illustration */}
                        <div className="mb-8 md:mb-12">
                            <div className="relative inline-block">
                                <div className="text-8xl md:text-9xl font-bold text-gray-100">
                                    404
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Halaman Tidak Ditemukan
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                            Mari kami bantu Anda menemukan yang Anda butuhkan.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full sm:w-auto flex items-center gap-2 border-gray-300 hover:bg-gray-50"
                            >
                                <Link href="#" onClick={() => window.history.back()}>
                                    <ArrowLeft className="w-4 h-4" />
                                    Kembali ke Halaman Sebelumnya
                                </Link>
                            </Button>

                            <Button
                                asChild
                                className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                            >
                                <Link href="/">
                                    <Home className="w-4 h-4" />
                                    Kembali ke Beranda
                                </Link>
                            </Button>
                        </div>

                        {/* Help Section */}
                        <div className="mt-16 p-6 bg-gray-50 rounded-2xl">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Butuh Bantuan?
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Tim customer service kami siap membantu Anda menemukan produk yang tepat.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    <Link href="/help">Pusat Bantuan</Link>
                                </Button>
                                <Button
                                    asChild
                                    className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
                                >
                                    <Link href="/contact">Hubungi Kami</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}