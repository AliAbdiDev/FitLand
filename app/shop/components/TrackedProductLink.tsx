"use client";

import type { ComponentProps, MouseEvent } from "react";
import Link from "next/link";
import { useRecentlyViewedProductsStore } from "@/stores/recently-viewed-products-store";

type TrackedProductLinkProps = ComponentProps<typeof Link> & {
  productId: string;
};

function TrackedProductLink({ productId, onClick, ...props }: TrackedProductLinkProps) {
  const addViewedProduct = useRecentlyViewedProductsStore(
    (state) => state.addViewedProduct
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    addViewedProduct(productId);
    onClick?.(event);
  };

  return <Link {...props} onClick={handleClick} />;
}

export default TrackedProductLink;
