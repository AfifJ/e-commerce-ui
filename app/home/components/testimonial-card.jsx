"use client";

import Image from "next/image";
import { Star } from "lucide-react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 mb-6 italic">
        "{testimonial.text}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-500">
            Membeli {testimonial.product}
          </div>
        </div>
      </div>
    </div>
  );
}