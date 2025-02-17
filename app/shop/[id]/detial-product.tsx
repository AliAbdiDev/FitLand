"use client";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Share2 } from "lucide-react";
import { memo, useCallback, useReducer, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { CopyBtn } from "@/components/my-components/my-btns";
import {
  ActionType,
  initialState,
  productReducer,
  ReducerState,
} from "./product-reducer";

function DetailProduct() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [state, dispatch] = useReducer<
    React.Reducer<ReducerState, { type: ActionType; payload?: any }>
  >(productReducer, initialState);

  return (
    <div className="space-y-5">
      <span className="max-w-sm block">
        <p className="text-xl">Size:</p>
        <div className="text-center text-xs w-full pt-2 text-black grid grid-cols-3 gap-2 *:duration-150 *:py-2 *:rounded-md *:px-3">
          {["S", "L", "M", "XL", "XXL"].map((size, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                dispatch({
                  type: "SET_SIZE",
                  payload: size,
                });
              }}
              className={cn(
                "bg-zinc-200",
                state?.selectedSize === size && "bg-primary/35"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </span>

      <span className="block">
        <p className="text-xl">Color:</p>
        <div className="flex items-center gap-2 pt-2">
          {[
            { lable: "red", color: "bg-red-600" },
            { lable: "green", color: "bg-green-600" },
            { lable: "zinc", color: "bg-zinc-600" },
          ]?.map((items, index) => (
            <button
              onClick={() =>
                dispatch({
                  type: "SET_COLOR",
                  payload: items?.lable,
                })
              }
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-1.5 bg-zinc-200 duration-150",
                state?.selectedColor === items?.lable && "bg-primary/35"
              )}
              key={index}
            >
              <div
                key={index}
                className={`${items?.color} rounded-full size-6`}
              ></div>
              <span className="text-sm">{items?.lable}</span>
            </button>
          ))}
        </div>

        <ul className="w-full mt-5 flex items-center gap-4">
          <li className="w-1/4 flex items-center justify-between max-w-[6rem] rounded-lg border border-zinc-300 py-1.5 px-2.5">
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "INCREMENT_PRODUCTNUMBER",
                })
              }
            >
              <Plus
                size={18}
                data-cond={state?.productNumber >= 10}
                className={"data-[cond=true]:text-muted-foreground"}
              />
            </button>
            <span className="">{state?.productNumber}</span>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: "DECREMENT_PRODUCTNUMBER",
                })
              }
            >
              <Minus
                size={18}
                className={
                  state?.productNumber <= 1 ? "text-muted-foreground" : ""
                }
              />
            </button>
          </li>

          <li className="w-2/4">
            <Button
              type="button"
              variant={"default"}
              className="w-full"
              onClick={() => console.info(state)}
            >
              Add to Cart
            </Button>
          </li>

          <li className="w-1/4 flex items-center gap-3 *:cursor-pointer">
            <Share2 size={21} onClick={() => setIsOpenDialog(true)} />

            <Heart
              size={21}
              className={cn(
                "duration-300",
                state?.favoriteProduct && " scale-[1.15] fill-red-600"
              )}
              onClick={() => {
                dispatch({
                  type: "SET_FAVORITE",
                  payload: !state?.favoriteProduct,
                });
              }}
            />
          </li>
        </ul>
      </span>

      <DialogComponent
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={useCallback((open) => setIsOpenDialog(open), [])}
      />
    </div>
  );
}

interface DialogComponentProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (value: boolean) => void;
}

const DialogComponent = memo(
  ({ isOpenDialog, setIsOpenDialog }: DialogComponentProps) => {
    const [href] = useState(
      typeof window !== "undefined" ? window.location.href : ""
    );

    return (
      <Dialog
        open={isOpenDialog}
        onOpenChange={(open) => setIsOpenDialog(open)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <p className="select-all bg-zinc-100 p-2 rounded-md w-full border border-zinc-300">
              {href}
            </p>

            <span className="w-12 h-full">
              <CopyBtn copyValue={href} />
            </span>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

DialogComponent.displayName = "DialogComponent in DetailProduct";

export default DetailProduct;
