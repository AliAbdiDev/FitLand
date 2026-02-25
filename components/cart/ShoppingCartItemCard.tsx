import { Minus, Plus, Trash2 } from "lucide-react";
import { MyProductCardMobileSize } from "@/components/my-components/my-product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {  priceFormatter } from "@/components/cart/cart-helpers";
import type { CartItem } from "@/stores/cart-store";

type ShoppingCartItemCardProps = {
  item: CartItem;
  onIncreaseQuantity: (id: string) => void;
  onDecreaseQuantity: (id: string) => void;
  onRemoveFromCart: (id: string) => void;
};

export function ShoppingCartItemCard({
  item,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}: ShoppingCartItemCardProps) {
  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <article className="flex flex-col gap-5 max-h-[853px] overflow-y-auto">
          <MyProductCardMobileSize
            imageSrc={item.image}
            title={item.title}
            descriptionText={item.model}
            minSize=""
            maxSize=""
            price={priceFormatter.format(item.price)}
            discountedPrice={
              item.originalPrice > item.price
                ? priceFormatter.format(item.originalPrice)
                : null
            }
            hideRating
            hideColorProducts
            wrapperClassName="border-none pb-3"
            imageClassName="rounded-lg object-cover"
            component={
              <div className="inline-flex items-center overflow-hidden rounded-xl border border-border bg-background shadow-sm mt-5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onIncreaseQuantity(item.id)}
                  className="h-11 w-9 rounded-none text-primary hover:bg-primary/10 hover:text-primary"
                  aria-label="افزایش تعداد"
                >
                  <Plus className="size-4" />
                </Button>
                <span className="grid h-11 min-w-10 place-items-center px-2 text-sm font-bold text-primary select-none">
                  {priceFormatter.format(item.quantity)}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onDecreaseQuantity(item.id)}
                  disabled={item.quantity <= 1}
                  className="h-11 w-9 rounded-none text-primary hover:bg-primary/10 hover:text-primary disabled:text-muted-foreground disabled:hover:bg-transparent"
                  aria-label="کاهش تعداد"
                >
                  <Minus className="size-4" />
                </Button>
                <div className="h-6 w-px bg-border" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveFromCart(item.id)}
                  className="h-11 w-9 rounded-none text-destructive hover:bg-destructive/10 hover:text-destructive"
                  aria-label="حذف کالا"
                >
                  <Trash2 className="size-4" />
                </Button>
                
              </div>
            }
          />
        </article>
      </CardContent>
    </Card>
  );
}
