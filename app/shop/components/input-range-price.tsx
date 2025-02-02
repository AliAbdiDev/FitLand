"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { initialState, rengeInput } from "@/redux/shop-filters-slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { forwardRef, memo } from "react";

interface Props {
  shopStateValue: { range: number[] };
  dispatch: AppDispatch;
}

const InputRangePrice = forwardRef(({ shopStateValue, dispatch }: Props) => {
  const formatPrice = (price: number) => {
    return price === initialState?.range[1]
      ? `$${price.toLocaleString()}+`
      : `$${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-3">
      <Label className="tabular-nums">
        From {formatPrice(shopStateValue?.range[0])} to{" "}
        {formatPrice(shopStateValue?.range[1])}
      </Label>
      <div className="flex items-center gap-4 py-2.5">
        <Slider
          name="price"
          value={shopStateValue?.range as number[]}
          onValueChange={(value) =>
            dispatch(rengeInput({ maxValue: value[0], minValue: value[1] }))
          }
          min={initialState?.range[0]}
          max={initialState?.range[1]}
          aria-label="Price range slider"
          className="h-1"
        />
      </div>
    </div>
  );
});
InputRangePrice.displayName = "InputRangePrice";
export default memo(InputRangePrice);
