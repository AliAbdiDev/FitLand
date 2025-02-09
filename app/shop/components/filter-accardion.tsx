'use client';

import MyTagInput from "@/components/my-components/my-tag-input";
import { sizeProduct } from "@/redux/shop-filters-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import ColorSelector from "./color-selector";
import InputRangePrice from "./input-range-price";
import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

function FilterAccardion({setTagInputValue,tagInputRef}) {
    const dispatch: AppDispatch = useDispatch();
    const filtersValue = useSelector((state: RootState) => state.shopFilters);
    const AccardionData = [
        {
          title: "Price:",
          value: "1",
          accardionContent: (
            <InputRangePrice shopStateValue={filtersValue} dispatch={dispatch} />
          ),
        },
        {
          title: "Color:",
          value: "2",
          accardionContent: (
            <ColorSelector
              colorValue={filtersValue.colorSelected}
              dispatch={dispatch}
            />
          ),
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
                      dispatch(sizeProduct({ size: "" }));
                    } else {
                      dispatch(sizeProduct({ size }));
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
              tags={[{ id: "ff", text: "Nike" }]}
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