"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { colorSelector } from "@/redux/shop-filters-slice";
import { AppDispatch } from "@/redux/store";
import {memo } from "react";

const SELECT_COLORS = [
  {
    value: "blue",
    label: "Blue",
    className:
      "border-blue-500 bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500",
  },
  {
    value: "indigo",
    label: "Indigo",
    className:
      "border-indigo-500 bg-indigo-500 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500",
  },
  {
    value: "pink",
    label: "Pink",
    className:
      "border-pink-500 bg-pink-500 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500",
  },
  {
    value: "red",
    label: "Red",
    className:
      "border-red-500 bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:bg-red-500",
  },
  {
    value: "orange",
    label: "Orange",
    className:
      "border-orange-500 bg-orange-500 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500",
  },
  {
    value: "amber",
    label: "Amber",
    className:
      "border-amber-500 bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:bg-amber-500",
  },
  {
    value: "emerald",
    label: "Emerald",
    className:
      "border-emerald-500 bg-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500",
  },
];
const ColorSelector = 
  ({ colorValue, dispatch }: { colorValue: string; dispatch: AppDispatch }) => {
    console.info('colorValue',colorValue);
    return (
      <RadioGroup
        className="flex gap-0.5 *:max-[1060px]:!size-[1.45rem] min-[1110px]:gap-1 duration-150"
        value={colorValue}
        onValueChange={(value) => {
          dispatch(colorSelector({color:value}));
          console.info(value);
        }}
      >
        <button
          type="button"
          className="size-6 my-auto rounded-full border border-primary bg-zinc-200"
          onClick={() => {
            dispatch(colorSelector({ color: '' }));
          }}
        ></button>
        {SELECT_COLORS?.map((color) => (
          <RadioGroupItem
            key={color?.value}
            value={color?.value}
            aria-label={color?.label}
            className={`size-6 shadow-none duration-150 ${color?.className}`}
          />
        ))}
      </RadioGroup>
    );
  }


ColorSelector.displayName = "ColorSelector";
export default memo(ColorSelector);
