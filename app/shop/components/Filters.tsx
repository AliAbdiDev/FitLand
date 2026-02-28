"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useState } from "react";
import { useShopFiltersStore } from "@/stores/shop-filters-store";
import { useShallow } from "zustand/react/shallow";
import FilterAccardion from "./filter-accardion";
import {
  buildShopFilterQueryString,
  clearShopFiltersQueryString,
  toShopUrl,
} from "./shop-filter-query";
import { useRouter, useSearchParams } from "next/navigation";

function Filters() {
  const filtersValue = useShopFiltersStore(
    useShallow((state) => ({
      range: state.range,
      colorSelected: state.colorSelected,
      sizeSelected: state.sizeSelected,
    }))
  );
  const resetFilters = useShopFiltersStore((state) => state.resetFilters);
  const [tagInputValue, setTagInputValue] = useState<unknown>(null);
  const tagInputRef = useRef<{ reset: () => void | null }>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const submitFilters = () => {
    const queryString = buildShopFilterQueryString(
      searchParams.toString(),
      filtersValue,
      tagInputValue
    );

    router.push(toShopUrl(queryString));
  };

  const handleReset = () => {
    resetFilters();
    tagInputRef.current?.reset();

    const queryString = clearShopFiltersQueryString(searchParams.toString());
    router.push(toShopUrl(queryString));
  };

  return (
    <section className="py-4 sticky-sidbar-wrapper me-4 w-3/12 space-y-3 max-lg:hidden">
      <ScrollArea className="size-full px-[5%]">
        <div className="pb-2 flex justify-between items-center w-full">
          <h3 className=" font-semibold">فیلترها</h3>
          <button type="button" className="text-sm text-red-700" onClick={handleReset}>
            حذف فیلترها
          </button>
        </div>
        <div>
          <FilterAccardion
            setTagInputValue={setTagInputValue}
            tagInputRef={tagInputRef}
          />

          <Button type="submit" variant="default" className="mt-5" onClick={submitFilters}>
            اعمال فیلتر
          </Button>
        </div>
      </ScrollArea>
    </section>
  );
}

export default Filters;
