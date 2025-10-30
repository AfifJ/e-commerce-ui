import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>

        {/* Empty Cart Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Keranjang Belanja Kosong
        </h2>
        <p className="text-gray-600 mb-8">
          Belum ada produk di keranjang Anda. Mulai berbelanja dan tambahkan produk favorit Anda!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4">
          {/* Primary CTA - Continue Shopping */}
          <Link href="/">
            <Button className="w-full" variant="default">
              <ArrowRight className="w-4 h-4 mr-2" />
              Jelajahi Produk
            </Button>
          </Link>

          {/* Secondary CTA - View Wishlist */}
          <Link href="/wishlist">
            <Button variant="outline" className="w-full">
              <Heart className="w-4 h-4 mr-2" />
              Lihat Wishlist
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}