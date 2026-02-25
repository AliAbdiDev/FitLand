"use client";

import { ShoppingCartEmptyState } from "@/components/cart/ShoppingCartEmptyState";
import { ShoppingCartItemsSection } from "@/components/cart/ShoppingCartItemsSection";
import { ShoppingCartSummarySidebar } from "@/components/cart/ShoppingCartSummarySidebar";
import type { CartTotals } from "@/components/cart/cart-helpers";
import { useCartStore } from "@/stores/cart-store";

export default function ShoppingCartPage() {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const resetCart = useCartStore((state) => state.resetCart);

  const totals = items.reduce<CartTotals>(
    (acc, item) => {
      acc.itemsPrice += item.originalPrice * item.quantity;
      acc.totalPrice += item.price * item.quantity;
      acc.totalQuantity += item.quantity;
      return acc;
    },
    { itemsPrice: 0, totalPrice: 0, totalQuantity: 0 }
  );

  const profit = Math.max(totals.itemsPrice - totals.totalPrice, 0);
  const profitPercent =
    totals.itemsPrice > 0 ? Math.round((profit / totals.itemsPrice) * 100) : 0;

  if (items.length === 0) {
    return <ShoppingCartEmptyState onResetCart={resetCart} />;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
      <div className="lg:flex lg:items-start lg:gap-8">
        <ShoppingCartItemsSection
          items={items}
          totalQuantity={totals.totalQuantity}
          onIncreaseQuantity={increaseQuantity}
          onDecreaseQuantity={decreaseQuantity}
          onRemoveFromCart={removeFromCart}
        />
        <ShoppingCartSummarySidebar
          totals={totals}
          profit={profit}
          profitPercent={profitPercent}
        />
      </div>
    </section>
  );
}
