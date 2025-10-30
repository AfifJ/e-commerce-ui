"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSlide({ banner }) {
  return (
    <div className="relative w-full h-full min-w-full">
      {/* Background Image */}
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {banner.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {banner.subtitle}
            </p>
            <Link href={banner.ctaLink}>
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
              >
                {banner.ctaText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}