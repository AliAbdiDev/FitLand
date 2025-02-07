"use client";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Check, ListFilter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useRef, useState } from "react";
import FilterAccardion from "./filter-accardion";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "@/redux/shop-filters-slice";
import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";

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
  const [tagInputValue, setTagInputValue] = useState(null);
  const tagInputRef = useRef<{ reset: () => void | null }>(null);
  const dispatch = useDispatch();

  const filtersValue = useSelector((state: RootState) => state.shopFilters);

  const nameButton = openDrawer?.nameButton === "filter" ? true : false;
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
          <SlidersHorizontal size={15}/>
        </button>
        <button
          className="flex items-center justify-center gap-2"
          type="button"
          onClick={() => {
            setOpenDrawer({ open: true, nameButton: "sort" });
          }}
        >
          Sort
          <ListFilter size={15}/>
        </button>
      </div>

      <Drawer
        open={openDrawer?.open}
        onOpenChange={(open) => setOpenDrawer({ open, nameButton: "" })}
      >
        <DrawerContent className="p-5">
          <div className="w-full flex items-center justify-between  mb-5 ">
            <DrawerTitle className="!font-semibold">
              {nameButton ? "Filter" : "Sort"}
            </DrawerTitle>
            <button
              type="button"
              onClick={() => {
                if (nameButton) {
                  dispatch(resetFilters());
                  tagInputRef.current?.reset();
                } else {
                  router.push("/shop");
                }
              }}
            >
              {nameButton
                ? "remove filters"
                : "remove sort"}
            </button>
          </div>

          {nameButton ? (
            <>
              <FilterAccardion
                setTagInputValue={setTagInputValue}
                tagInputRef={tagInputRef}
              />
            {nameButton&& ( <Button
            variant={'default'}
                type="submit"
                className="mt-5"
                onClick={() => {
                  toast({
                    title:
                      "This is demo mode. The project is going to be updated",
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
                }}
              >
                submit
              </Button>)}
            </>
          ) : (
            <ul className="w-full flex flex-col items-start justify-center gap-3 ">
              {sortData?.map((sort, index) => (
                <li
                  className="flex items-center justify-between w-full"
                  key={index}
                >
                  <Link href={{ query: { category: sort?.query } }}>
                    {sort?.label}
                  </Link>
                  {searchParams.get("category") === sort?.query && (
                    <Check size={19} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default memo(SortAndFilterMobileSize);
