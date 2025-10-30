import { Heart, Star } from "lucide-react";

export default function WishlistHeader({ totalItems }) {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Semua Disukai
          </h1>

          {/* Subtitle */}
          <p className=" mb-4">
            {totalItems} produk favorit Anda
          </p>

        </div>
      </div>
    </div>
  );
}