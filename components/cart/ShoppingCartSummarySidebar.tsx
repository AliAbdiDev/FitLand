import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, Gift, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatPrice,
  priceFormatter,
  type CartTotals,
} from "@/components/cart/cart-helpers";
import { cn } from "@/lib/utils";

type ShoppingCartSummarySidebarProps = {
  totals: CartTotals;
  profit: number;
  profitPercent: number;
};

type SummaryRowProps = {
  label: string;
  value: string;
  className?: string;
  valueClassName?: string;
};

function SummaryRow({ label, value, className, valueClassName }: SummaryRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between text-sm text-muted-foreground",
        className
      )}
    >
      <span>{label}</span>
      <span className={cn("font-semibold text-foreground", valueClassName)}>{value}</span>
    </div>
  );
}

type PromoCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  actionHref?: string;
  className?: string;
  iconWrapClassName?: string;
  iconClassName?: string;
  actionClassName?: string;
};

function PromoCard({
  icon,
  title,
  description,
  actionLabel,
  actionHref = "#",
  className,
  iconWrapClassName,
  iconClassName,
  actionClassName,
}: PromoCardProps) {
  return (
    <Card className={cn("rounded-xl shadow-none", className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("mt-1 rounded-full p-2", iconWrapClassName, iconClassName)}>
            {icon}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-foreground">{title}</p>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "h-auto gap-1 px-1 py-0 text-sm font-semibold hover:bg-transparent",
                  actionClassName
                )}
              >
                <Link href={actionHref}>
                  {actionLabel}
                  <ChevronLeft className="size-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs leading-6 text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ShoppingCartSummarySidebar({
  totals,
  profit,
  profitPercent,
}: ShoppingCartSummarySidebarProps) {
  return (
    <aside className="mt-6 w-full shrink-0 space-y-4 lg:mt-0 lg:w-[320px]">
      <Card className=" border-border shadow-sm">
        <CardHeader className="p-5 pb-0">
          <CardTitle className="text-base font-bold text-foreground">
            خلاصه سفارش
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-4">
          <div className="space-y-4">
            <SummaryRow
              label={`قیمت کالاها (${priceFormatter.format(totals.totalQuantity)})`}
              value={formatPrice(totals.itemsPrice)}
            />
            <SummaryRow label="جمع سبد خرید" value={formatPrice(totals.totalPrice)} />
            <SummaryRow
              label="سود شما از خرید"
              value={`${formatPrice(profit)} (${priceFormatter.format(profitPercent)}٪)`}
              className="text-emerald-700"
              valueClassName="font-bold text-emerald-700"
            />
          </div>

          <Button type="button" className="mt-5 h-12 w-full rounded-xl text-sm font-bold">
            تایید و تکمیل سفارش
          </Button>
        </CardContent>
      </Card>

      <p className="px-2 text-center text-xs leading-6 text-muted-foreground">
        هزینه این سفارش هنوز پرداخت نشده و در صورت اتمام موجودی، کالاها از سبد حذف می شوند.
      </p>

      <PromoCard
        icon={<Gift className="size-4" />}
        title="هر ماه ۱۰ بار ارسال رایگان با پلاس"
        actionLabel="افزودن"
        description="۴ ارسال امروز / ارسال سوپرمارکتی / ۴ ارسال هفتگی"
        className="border-fuchsia-300/70"
        iconWrapClassName="bg-fuchsia-100"
        iconClassName="text-fuchsia-600"
        actionClassName="text-fuchsia-600 hover:text-fuchsia-700"
      />

      <PromoCard
        icon={<Heart className="size-4" />}
        title="به سبد خریدتان مهر اضافه کنید"
        actionLabel="مشاهده"
        description="کمک به مددجویان و خیریه ها، به انتخاب خودتان"
        className="border-emerald-300/70"
        iconWrapClassName="bg-emerald-100"
        iconClassName="text-emerald-600"
        actionClassName="text-emerald-600 hover:text-emerald-700"
      />
    </aside>
  );
}
