"use client";
import Image from "next/image";
import { useCallback, useReducer } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import { ImageIcon } from "lucide-react";
import ImgSlider from "./img-slider";
import {
  imageViewerActions,
  imageViewerInitialState,
  imageViewerReducer,
} from "./image-viewer-reducer";

const imgListData = [
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
];

function ImageProduct() {
  const [state, dispatch] = useReducer(
    imageViewerReducer,
    imageViewerInitialState
  );
  const { setActiveIndex, setImgAddress } = imageViewerActions(dispatch);

  const handleImgClick = useCallback(
    ({ src, index }: { src: string; index: number }) => {
      setImgAddress(src);
      setActiveIndex(index);
    },
    [setImgAddress, setActiveIndex]
  );

  return (
    <>
      <div className=" w-1/2 flex-center max-md:hidden">
        <div className=" rounded-md overflow-hidden space-y-7 w-full">
          <span
            className=" h-96 block rounded-md w-full"
            onClick={() => {
              handleImgClick({ src: imgListData?.[0], index: 0 });
            }}
          >
            {/* main img */}
            <Image
              src={imgListData?.[0] || "/pic/img.png"}
              alt="تصویر محصول"
              width={200}
              height={200}
              className="size-full object-cover"
              quality={100}
            />
          </span>

          <ul className="w-full flex items-center gap-2 *:cursor-pointer *:overflow-hidden *:border *:border-zinc-300 *:rounded-lg *:size-20">
            {imgListData?.slice(0, 4)?.map((src, index) => (
              <li
                key={index}
                onClick={() => handleImgClick({ src, index })}
                className={
                  imgListData?.slice(0, 4).length - 1 === index
                    ? "max-lg:!hidden"
                    : ""
                }
              >
                <Image
                  src={src || "/pic/img.png"}
                  alt="تصویر محصول"
                  className="object-contain size-full"
                  width={90}
                  height={90}
                />
              </li>
            ))}

            <li
              className="flex-center bg-zinc-100 flex-col gap-2 p-1"
              onClick={() => handleImgClick({ src: imgListData[0], index: 0 })}
            >
              <ImageIcon />
              <p className="text-xs text-center">بیشتر از +4 تصویر</p>
            </li>
          </ul>
        </div>
      </div>

      <div
        data-showdialog={!!state?.imgAddress}
        className="flex data-[showDialog ='true']:min-h-screen items-center justify-center"
      >
        <Dialog
          open={!!state?.imgAddress}
          onOpenChange={(open) => setImgAddress(open ? state?.imgAddress : "")}
          key={"dialog-img"}
        >
          <DialogContent className="max-w-full max-h-full p-0 w-screen h-screen !rounded-t-none">
            <DialogTitle className="sr-only">عنوان</DialogTitle>
            <ImgSlider
              activeIndex={state?.activIndex}
              setActiveIndex={setActiveIndex}
              setImgAddress={setImgAddress}
              imgAddress={state?.imgAddress}
              imgListData={imgListData}
            />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default ImageProduct;
