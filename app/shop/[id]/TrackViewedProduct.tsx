"use client";

import { useEffect } from "react";
import { useRecentlyViewedProductsStore } from "@/stores/recently-viewed-products-store";

type TrackViewedProductProps = {
  productId: string;
};

export default function TrackViewedProduct({ productId }: TrackViewedProductProps) {
  const addViewedProduct = useRecentlyViewedProductsStore(
    (state) => state.addViewedProduct
  );

  useEffect(() => {
    addViewedProduct(productId);
  }, [addViewedProduct, productId]);

  return null;
}
