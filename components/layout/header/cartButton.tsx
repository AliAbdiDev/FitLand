"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import { LucideShoppingBag,  } from "lucide-react";
import Link from "next/link";

function CartButton() {
  const items = useCartStore((state) => state.items);

  return (
    <Button asChild className="rounded-lg px-3 relative">
      <Link href="/cart">
        <LucideShoppingBag />
        {items?.length > 0 && (
          <Badge className="rounded-full size-fit absolute -top-2 -left-2 py-0.5 px-1.5 bg-amber-100 text-primary hover:bg-amber-50 shadow-sm">
            {items?.length}
          </Badge>
        )}
      </Link>
    </Button>
  );
}

export default CartButton;
