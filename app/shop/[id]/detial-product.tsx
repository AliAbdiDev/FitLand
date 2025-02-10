"use client";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Share2, Copy } from "lucide-react";
import { memo, useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function DetailProduct() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [detailProduct, setDetailProduct] = useState({
    productNumber: 1,
    selectedColor: 0,
    selectedSize: 0,
  });

  return (
    <>
      <span className="max-w-sm block">
        Size:
        <div className="text-center text-xs w-full pt-2 text-black grid grid-cols-3 gap-2 *:duration-150 *:py-2 *:rounded-md *:px-3">
          {["S", "L", "M", "XL", "XXL"].map((size, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setDetailProduct((prev) => ({ ...prev, selectedSize: index }));
              }}
              className={cn(
                "bg-zinc-200",
                detailProduct?.selectedSize === index && "bg-primary/40"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </span>

      <span className="">
        Color:
        <div className="flex items-center gap-3 pt-2">
          {[
            { lable: "red", color: "bg-red-600" },
            { lable: "green", color: "bg-green-600" },
            { lable: "zinc", color: "bg-zinc-600" },
          ]?.map((items, index) => (
            <button
              onClick={() =>
                setDetailProduct((prev) => ({ ...prev, selectedColor: index }))
              }
              className={cn(
                "flex items-center gap-2 rounded-lg px-2.5 py-1.5 bg-zinc-200 duration-150",
                detailProduct?.selectedColor === index && "bg-primary/35"
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
          <li className="w-1/4 flex items-center justify-between max-w-[6rem] rounded-lg border border-muted-foreground py-1.5 px-2.5">
            <button
              type="button"
              onClick={() =>
                setDetailProduct((prev) => ({
                  ...prev,
                  productNumber:
                    prev?.productNumber < 10
                      ? prev?.productNumber + 1
                      : prev?.productNumber,
                }))
              }
            >
              <Plus
                size={18}
                data-cond={detailProduct?.productNumber >= 10}
                className={"data-[cond=true]:text-muted-foreground"}
              />
            </button>
            <span className="">{detailProduct?.productNumber}</span>
            <button
              type="button"
              onClick={() =>
                setDetailProduct((prev) => ({
                  ...prev,
                  productNumber:
                    prev?.productNumber > 1
                      ? prev?.productNumber - 1
                      : prev?.productNumber,
                }))
              }
            >
              <Minus
                size={18}
                className={
                  detailProduct?.productNumber <= 1
                    ? "text-muted-foreground"
                    : ""
                }
              />
            </button>
          </li>

          <li className="w-2/4 ">
            <Button type="button" variant={"default"} className="w-full">
              Add to Cart
            </Button>
          </li>
          <li className="w-1/4 flex items-center gap-3 *:cursor-pointer">
            <Share2 size={21} onClick={() => setIsOpenDialog(true)} />

            <Heart
              size={21}
              className="duration-300"
              onClick={({ currentTarget: { classList } }) => {
                ["fill-red-500", "scale-[1.15]"].forEach((className) =>
                  classList.toggle(className)
                );
              }}
            />
          </li>
        </ul>
      </span>
      <DialogComponent
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={useCallback((open) => setIsOpenDialog(open), [])}
      />
    </>
  );
}

interface DialogComponentProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (value: boolean) => void;
}

const DialogComponent = memo(
  ({ isOpenDialog, setIsOpenDialog }: DialogComponentProps) => {
    const [fullUrl, setFullUrl] = useState<string | null>(null);

    useEffect(() => {
      if (typeof window !== "undefined") {
        setFullUrl(window.location.href);
      }
    }, []);

    const handleCopy = () => {
      navigator.clipboard
        .writeText(fullUrl || "")
        .then(() => {
          toast({
            title: "Successful",
            description: "Copied to clipboard!",
            className: "bg-emerald-500 text-white border-none text-sm",
          });
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    };



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
            <p className="select-all bg-gray-100 p-2 rounded-md w-full">
              {fullUrl}
            </p>

            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              <Copy size={20} />
            </Button>
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
