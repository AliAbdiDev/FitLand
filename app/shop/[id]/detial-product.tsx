"use client";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Share2, Copy } from "lucide-react";
import { useState } from "react";

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

function DetailProduct() {
  const [productNumber, setProductNumber] = useState(1);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  return (
    <>
      <span className="max-w-sm block">
        Size:
        <div className="text-center text-xs w-full pt-2 text-black grid grid-cols-3 gap-2 *:py-1.5 *:rounded-sm *:px-3 *:bg-zinc-200">
          {["S", "L", "M", "XL", "XXL"].map((size, index) => (
            <button key={index} type="button">
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
              className="flex items-center gap-2 rounded-lg bg-primary/40 px-3 py-1.5"
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
                setProductNumber((prev) => (prev < 10 ? prev + 1 : prev))
              }
            >
              <Plus
                size={18}
                data-cond={productNumber >= 10}
                className={"data-[cond=true]:text-muted-foreground"}
              />
            </button>
            <span className="">{productNumber}</span>
            <button
              type="button"
              onClick={() =>
                setProductNumber((prev) => (prev > 1 ? prev - 1 : prev))
              }
            >
              <Minus
                size={18}
                className={productNumber <= 1 ? "text-muted-foreground" : ""}
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
        setIsOpenDialog={setIsOpenDialog}
      />
    </>
  );
}

const DialogComponent = ({ isOpenDialog, setIsOpenDialog }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        console.log(""); 
        toast({
          title:'Successful',
          description:'Copied to clipboard!',
          className:'bg-emerald-500 text-white border-none text-sm'
        })
      })
      .catch(err => {
        console.error("Failed to copy:", err);
      });
  };
  return (
    <Dialog open={isOpenDialog} onOpenChange={(open) => setIsOpenDialog(open)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <p className="select-all bg-gray-100 p-2 rounded-md w-full">
            {window.location.href}
          </p>

          <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
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
};

export default DetailProduct;
