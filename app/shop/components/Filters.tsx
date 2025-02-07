"use client";
import { Button } from "@/components/ui/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { resetFilters} from "@/redux/shop-filters-slice";
import { useRef, useState } from "react";
import FilterAccardion from "./filter-accardion";

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

  return (
    <section className="py-4 sticky-sidbar-wrapper me-4 w-3/12 space-y-3 max-lg:hidden">
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
          <FilterAccardion
            setTagInputValue={setTagInputValue}
            tagInputRef={tagInputRef}
          />

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
