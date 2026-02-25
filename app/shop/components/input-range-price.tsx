"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import React, { memo } from "react";
import {
  initialShopFiltersState,
  useShopFiltersStore,
} from "@/stores/shop-filters-store";

const InputRangePrice = () => {
  const range = useShopFiltersStore((state) => state.range);
  const updateRange = useShopFiltersStore((state) => state.rengeInput);

  const formatPrice = (price: number) => {
    return price === initialShopFiltersState.range[1]
      ? `${price.toLocaleString()} تومان+`
      : `${price.toLocaleString()} تومان`;
  };

  return (
    <div className="space-y-3">
      <Label className="tabular-nums">
        از {formatPrice(range?.[0])} تا {formatPrice(range?.[1])}
      </Label>
      <div className="flex items-center gap-4 py-2.5">
        <Slider
          name="price"
          value={range as number[]}
          onValueChange={(value) =>
            updateRange({ maxValue: value[0], minValue: value[1] })
          }
          min={initialShopFiltersState.range[0]}
          max={initialShopFiltersState.range[1]}
          aria-label="اسلایدر محدوده قیمت"
          className="h-1"
        />
      </div>
    </div>
  );
};

InputRangePrice.displayName = "InputRangePrice";
export default memo(InputRangePrice);
