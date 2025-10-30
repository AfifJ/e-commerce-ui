"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Reusable cart button dengan counter
export default function CartButton({ itemCount = 0 }) {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </Button>
  );
}