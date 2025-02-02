"use client";
import { Button } from "@/components/ui/button";
import InputRangePrice from "./input-range-price";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import MyTagInput from "@/components/my-components/my-tag-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorSelector from "./color-selector";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resetFilters, sizeProduct } from "@/redux/shop-filters-slice";
import { useRef, useState } from "react";

function Filters() {
  const dispatch: AppDispatch = useDispatch();
  const filtersValue = useSelector((state: RootState) => state.shopFilters);
  const [tagInputValue, setTagInputValue] = useState(null);
  const tagInputRef = useRef<{ reset: () => void | null }>(null);

  const submitFilters = () => {
    toast({
      title: "This is demo mode. The project is going to be updated",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              { ...filtersValue, tagInputValue: tagInputValue },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });
  };

  const AccardionData = [
    {
      title: "Price",
      value: "1",
      accardionContent: (
        <InputRangePrice shopStateValue={filtersValue} dispatch={dispatch} />
      ),
    },
    {
      title: "Color",
      value: "2",
      accardionContent: (
        <ColorSelector
          colorValue={filtersValue.colorSelected}
          dispatch={dispatch}
        />
      ),
    },
    {
      title: "Size",
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
                "cursor-pointer block",
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
      title: "Brands",
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
    <section className="py-4 sticky-sidbar-wrapper me-4 w-3/12 space-y-3">
      <ScrollArea className="size-full px-[5%]">
        <div className="pb-2 flex justify-between items-center w-full">
          <h3 className=" font-semibold">Filters</h3>
          <button
            type="button"
            className="text-sm"
            onClick={() => {
              dispatch(resetFilters());
              tagInputRef.current?.reset();
            }}
          >
            remove filters
          </button>
        </div>
        <div>
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={Array.from(
              { length: AccardionData?.length - 1 },
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

          <Button
            type="submit"
            variant={"default"}
            className="mt-5"
            onClick={submitFilters}
          >
            Submit
          </Button>
        </div>
      </ScrollArea>
    </section>
  );
}

export default Filters;
