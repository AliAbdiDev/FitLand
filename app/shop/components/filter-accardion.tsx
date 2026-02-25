'use client';

import MyTagInput from "@/components/my-components/my-tag-input";
import ColorSelector from "./color-selector";
import InputRangePrice from "./input-range-price";
import { cn } from "@/lib/utils";
import { useShopFiltersStore } from "@/stores/shop-filters-store";
import { useShallow } from "zustand/react/shallow";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

function FilterAccardion({setTagInputValue,tagInputRef}) {
    const filtersValue = useShopFiltersStore(
      useShallow((state) => ({
        range: state.range,
        colorSelected: state.colorSelected,
        sizeSelected: state.sizeSelected,
      }))
    );
    const setSizeProduct = useShopFiltersStore((state) => state.sizeProduct);
    const AccardionData = [
        {
          title: "Price:",
          value: "1",
          accardionContent: <InputRangePrice />,
        },
        {
          title: "Color:",
          value: "2",
          accardionContent: <ColorSelector />,
        },
        {
          title: "Size:",
          value: "3",
          accardionContent: (
            <div className="text-center text-xs w-full text-black grid grid-cols-3 gap-2 *:py-1.5 *:rounded-sm *:px-3 *:bg-zinc-200">
              {["S", "L", "M", "XL", "XXL", "remove"].map((size, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    if (size.includes("remove")) {
                      setSizeProduct({ size: "" });
                    } else {
                      setSizeProduct({ size });
                    }
                  }}
                  className={cn(
                    "cursor-pointer block duration-150",
                    !size.includes("remove") &&
                      size === filtersValue.sizeSelected &&
                      "!bg-primary-light"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          ),
        },
        {
          title: "Brands:",
          value: "4",
          accardionContent: (
            <MyTagInput
              placeholder="Add tags"
              tags={[]}
              ref={tagInputRef}
              getInputvalue={(value) => setTagInputValue(value)}
            />
          ),
        },
      ];
    return (
        <Accordion
            type="multiple"
            className="w-full"
            defaultValue={Array.from(
              { length: AccardionData?.length },
              (_, index) => (index + 1).toString()
            )}
          >
            {AccardionData.map((item) => (
              <AccordionItem value={item?.value} key={item?.value}>
                <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline">
                  {item?.title}
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  {item?.accardionContent}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
    );
}

export default FilterAccardion;
