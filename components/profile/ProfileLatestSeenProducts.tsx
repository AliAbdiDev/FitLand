"use client";

import Link from "next/link";
import React from "react";
import { MyProductCard, MyProductCardMobileSize } from "@/components/my-components/my-product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSportProducts } from "@/app/shop/mock-sport-products";
import { useRecentlyViewedProductsStore } from "@/stores/recently-viewed-products-store";

const productsById = new Map(mockSportProducts.map((product) => [product.id, product]));

export default function ProfileLatestSeenProducts() {
  const productIds = useRecentlyViewedProductsStore((state) => state.productIds);
  const clearViewedProducts = useRecentlyViewedProductsStore(
    (state) => state.clearViewedProducts
  );
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const latestProducts = React.useMemo(
    () =>
      productIds
        .slice(0, 10)
        .map((id) => productsById.get(id))
        .filter((product): product is NonNullable<typeof product> => Boolean(product)),
    [productIds]
  );

  return (
    <Card className="rounded-2xl border-border shadow-sm">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg">۱۰ محصول آخر دیده‌شده</CardTitle>
        <button
          type="button"
          onClick={clearViewedProducts}
          className="text-sm text-red-600 hover:text-red-700"
        >
          پاک کردن
        </button>
      </CardHeader>
      <CardContent>
        {!mounted ? (
          <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
        ) : latestProducts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            هنوز محصولی مشاهده نکرده‌اید.
          </p>
        ) : (
          <div className="grid max-sm:grid-cols-1 max-[1260px]:grid-cols-2 min-[1260px]:grid-cols-3 gap-3">
            {latestProducts.map((product) => (
              <React.Fragment key={product.id}>
                <Link href={`/shop/${product.id}`} className="max-sm:hidden w-full block">
                  <MyProductCard {...product} />
                </Link>
                <Link href={`/shop/${product.id}`} className="sm:hidden block">
                  <MyProductCardMobileSize {...product} />
                </Link>
              </React.Fragment>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
