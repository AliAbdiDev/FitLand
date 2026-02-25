import {
  Bluetooth,
  Headphones,
  Minus,
  Plus,
  ShieldCheck,
  Store,
  Trash2,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, priceFormatter } from "@/components/cart/cart-helpers";
import type { CartItem } from "@/stores/cart-store";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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
  const lineDiscount = Math.max(
    (item.originalPrice - item.price) * item.quantity,
    0,
  );
  const linePercent =
    item.originalPrice > 0
      ? Math.round(
          ((item.originalPrice - item.price) / item.originalPrice) * 100,
        )
      : 0;

  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <article className="flex flex-col gap-5 lg:flex-row lg:items-start">
          <div className="max-lg:w-full max-lg:h-96 max-sm:h-72 relative flex items-center justify-center bg-background shrink-0 self-center rounded-2xl border border-border overflow-hidden lg:self-start">
            <Image
              quality={90}
              alt={item?.title?.slice(0, 10) || "post-card"}
              src={item?.image}
              width={110}
              height={110}
              className="object-cover size-full"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-2.5">
              <h2 className="text-sm font-bold leading-7 text-foreground sm:text-base">
                {item.title}
              </h2>
              <p className="text-sm font-semibold text-foreground">
                {item.model}
              </p>
            </div>

            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Tooltip delayDuration={150}>
                  <TooltipTrigger>
                    {" "}
                    <div
                      className={`size-5 rounded-full border border-gray-400 bg-[${item?.color}]`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>رنگ محصول</TooltipContent>
                </Tooltip>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-muted-foreground text-green-600" />
                <span>{item.warranty}</span>
              </li>
            </ul>
          </div>

          <div className="w-full shrink-0 space-y-3 lg:w-auto lg:min-w-[220px]">
            <p className="text-sm font-bold text-primary">فروش ویژه</p>

            <div className="text-left lg:text-right">
              <p className="text-sm text-emerald-600">
                <span className="line-through text-muted-foreground/70">{formatPrice(lineDiscount)}</span>{" "}
                <span className="text-emerald-500">
                  ({priceFormatter.format(linePercent)}٪)
                </span>{" "}
                تخفیف
              </p>
              <p className="mt-1 text-xl font-black text-foreground">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>

            <div className="inline-flex items-center overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onIncreaseQuantity(item.id)}
                className="h-11 w-11 rounded-none text-primary hover:bg-primary/10 hover:text-primary"
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
                className="h-11 w-11 rounded-none text-primary hover:bg-primary/10 hover:text-primary disabled:text-muted-foreground disabled:hover:bg-transparent"
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
                className="h-11 w-11 rounded-none text-destructive hover:bg-destructive/10 hover:text-destructive"
                aria-label="حذف کالا"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
