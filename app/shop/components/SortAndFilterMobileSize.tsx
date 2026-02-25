"use client";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Check, ListFilter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useRef, useState } from "react";
import FilterAccardion from "./filter-accardion";
import { Button } from "@/components/ui/button";
import { useShopFiltersStore } from "@/stores/shop-filters-store";
import { useShallow } from "zustand/react/shallow";
import {
  buildShopFilterQueryString,
  clearShopFiltersQueryString,
  clearShopSortQueryString,
  setShopSortQueryString,
  toShopUrl,
} from "./shop-filter-query";

interface Props {
  sortData: {
    label: string;
    query: string;
  }[];
}

function SortAndFilterMobileSize({ sortData }: Props) {
  const [openDrawer, setOpenDrawer] = useState({ open: false, nameButton: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [tagInputValue, setTagInputValue] = useState<unknown>(null);
  const tagInputRef = useRef<{ reset: () => void | null }>(null);
  const resetFilters = useShopFiltersStore((state) => state.resetFilters);
  const filtersValue = useShopFiltersStore(
    useShallow((state) => ({
      range: state.range,
      colorSelected: state.colorSelected,
      sizeSelected: state.sizeSelected,
    }))
  );

  const isFilterDrawer = openDrawer.nameButton === "filter";

  return (
    <>
      <div className="text-sm lg:hidden max-sm:text-xs w-full flex items-center justify-start gap-2.5 max-sm:justify-between *:rounded-full *:border *:border-zinc-300 *:px-5 *:py-2">
        <button
          className="flex items-center justify-center gap-2"
          type="button"
          onClick={() => {
            setOpenDrawer({ open: true, nameButton: "filter" });
          }}
        >
          Filter
          <SlidersHorizontal size={15} />
        </button>
        <button
          className="flex items-center justify-center gap-2"
          type="button"
          onClick={() => {
            setOpenDrawer({ open: true, nameButton: "sort" });
          }}
        >
          Sort
          <ListFilter size={15} />
        </button>
      </div>

      <Drawer
        open={openDrawer.open}
        onOpenChange={(open) => setOpenDrawer({ open, nameButton: "" })}
      >
        <DrawerContent className="p-5">
          <div className="w-full flex items-center justify-between mb-5">
            <DrawerTitle className="!font-semibold">
              {isFilterDrawer ? "Filter" : "Sort"}
            </DrawerTitle>
            <button
              type="button"
              className="text-red-700"
              onClick={() => {
                if (isFilterDrawer) {
                  resetFilters();
                  tagInputRef.current?.reset();
                  const queryString = clearShopFiltersQueryString(searchParams.toString());
                  router.push(toShopUrl(queryString));
                } else {
                  const queryString = clearShopSortQueryString(searchParams.toString());
                  router.push(toShopUrl(queryString));
                }

                setOpenDrawer({ open: false, nameButton: "" });
              }}
            >
              {isFilterDrawer ? "remove filters" : "remove sort"}
            </button>
          </div>

          {isFilterDrawer ? (
            <>
              <FilterAccardion
                setTagInputValue={setTagInputValue}
                tagInputRef={tagInputRef}
              />
              <Button
                variant="default"
                type="submit"
                className="mt-5"
                onClick={() => {
                  const queryString = buildShopFilterQueryString(
                    searchParams.toString(),
                    filtersValue,
                    tagInputValue
                  );
                  router.push(toShopUrl(queryString));
                  setOpenDrawer({ open: false, nameButton: "" });
                }}
              >
                submit
              </Button>
            </>
          ) : (
            <ul className="w-full flex flex-col items-start justify-center gap-3">
              {sortData.map((sort, index) => {
                const sortHref = toShopUrl(
                  setShopSortQueryString(searchParams.toString(), sort.query)
                );

                return (
                  <li className="flex items-center justify-between w-full" key={index}>
                    <Link href={sortHref}>{sort.label}</Link>
                    {searchParams.get("category") === sort.query && <Check size={19} />}
                  </li>
                );
              })}
            </ul>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default memo(SortAndFilterMobileSize);
