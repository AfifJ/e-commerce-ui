"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PromoBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <Link
          href="/flash-sale"
          className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative h-64 md:h-80 lg:h-96">
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop&crop=center"
              alt="Flash Sale Midnight"
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg">
                  <div className="inline-flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    <span className="animate-pulse">🔥 FLASH SALE</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Flash Sale Midnight!
                  </h2>

                  <p className="text-lg md:text-xl text-white/90 mb-6">
                    Diskon ekstra hingga 70% khusus member. Terbatas hanya 100 produk pertama!
                  </p>

                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 group-hover:scale-105 transition-transform duration-300"
                  >
                    <span className="flex items-center gap-2">
                      Dapatkan Penawaran
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}