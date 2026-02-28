import { priceFormatter } from "@/components/cart/cart-helpers";
import { ShoppingCartItemCard } from "@/components/cart/ShoppingCartItemCard";
import type { CartItem } from "@/stores/cart-store";

type ShoppingCartItemsSectionProps = {
  items: CartItem[];
  totalQuantity: number;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
};

export function ShoppingCartItemsSection({
  items,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}: ShoppingCartItemsSectionProps) {
  return (
    <div className="flex-1 space-y-5">
      <div className="flex items-center gap-2 mr-2">
        <h1 className="text-lg font-bold">سبد خرید شما</h1>
        <span className="text-sm text-muted-foreground">
          {priceFormatter.format(1)} مرسوله
        </span>
      </div>
      <div className="space-y-5">
        {items.map((item) => (
          <ShoppingCartItemCard
            key={item.id}
            item={item}
            onIncreaseQuantity={onIncreaseQuantity}
            onDecreaseQuantity={onDecreaseQuantity}
            onRemoveFromCart={onRemoveFromCart}
          />
        ))}
      </div>
    </div>
  );
}
