"use client";

import Link from "next/link";
import React from "react";
import {
  MyProductCardMobileSize,
} from "@/components/my-components/my-product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSportProducts } from "@/app/shop/mock-sport-products";
import { useRecentlyViewedProductsStore } from "@/stores/recently-viewed-products-store";

const productsById = new Map(
  mockSportProducts.map((product) => [product.id, product]),
);

export default function ProfileLatestSeenProducts() {
  const productIds = useRecentlyViewedProductsStore(
    (state) => state.productIds,
  );
  const clearViewedProducts = useRecentlyViewedProductsStore(
    (state) => state.clearViewedProducts,
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
        .filter((product): product is NonNullable<typeof product> =>
          Boolean(product),
        ),
    [productIds],
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
      <CardContent className=" max-h-[853px] overflow-y-auto">
        {!mounted ? (
          <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
        ) : latestProducts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            هنوز محصولی مشاهده نکرده‌اید.
          </p>
        ) : (
          <div className="flex items-center justify-between flex-col gap-8 ">
            {latestProducts.map((product) => (
                <Link href={`/shop/${product.id}`} className="w-full" key={product.id}>
                  <MyProductCardMobileSize
                    imageSrc={product.imageSrc}
                    title={product.title}
                    minSize="120px"
                    maxSize="160px"
                    price={product.price}
                    discountedPrice={product.discountedPrice}
                    numberActiveStars={product.numberActiveStars}
                  />
                </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
