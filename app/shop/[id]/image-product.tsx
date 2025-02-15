"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const imgListData = [
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
  "/image/borwn-showse.png",
];

function ImageProduct() {
  const [imgAddress, setImgAddress] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showImg, setShowImg] = useState(true);
  const handleImgClick = useCallback(
    ({ src, index }: { src: string; index: number }) => {
      setImgAddress(src);
      setActiveIndex(index);
    },
    []
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setShowImg(() => {
        if (window.innerWidth > 640) {
          return true;
        }
        return false;
      });
    });
  }, []);
  return (
    <>
      <div className=" w-1/2 flex-center ">
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
              alt="product image"
              width={200}
              height={200}
              className="size-full object-cover"
              quality={100}
            />
          </span>

          <ul className="w-full flex items-center gap-2 *:cursor-pointer *:overflow-hidden *:border *:border-zinc-300 *:rounded-lg *:size-24">
            {imgListData?.slice(0, 4)?.map((src, index) => (
              <li key={index} onClick={() => handleImgClick({ src, index })}>
                <Image
                  src={src || "/pic/img.png"}
                  alt="product image"
                  className="object-contain size-full"
                  width={90}
                  height={90}
                />
              </li>
            ))}

            <li
              className="flex-center bg-zinc-100 flex-col gap-2"
              onClick={() => handleImgClick({ src: imgListData[0], index: 0 })}
            >
              <ImageIcon />
              <p className="text-xs text-center">More than +4 images</p>
            </li>
          </ul>
        </div>
      </div>

      {showImg ? (
        <div className="flex items-center justify-center min-h-screen">
          <Dialog
            open={showImg? !!imgAddress: false}
            onOpenChange={(open) => setImgAddress(open ? imgAddress : "")}
            key={"dialog-img"}
          >
            <DialogContent className="max-w-full max-h-full p-0 w-screen h-screen">
              <DialogTitle className="sr-only">title</DialogTitle>
              <ImageSlider
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                setImgAddress={setImgAddress}
                imgAddress={imgAddress as string}
              />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Drawer
          open={!showImg? !!imgAddress: false}
          onOpenChange={(open) => setImgAddress(open ? imgAddress : "")}
        >
          <DrawerContent className="h-full w-full p-0 rounded-t-none">
            <DrawerTitle className="sr-only">title</DrawerTitle>
            <ImageSlider
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              setImgAddress={setImgAddress}
              imgAddress={imgAddress as string}
            />
            <Button
              variant={"ghost"}
              type="button"
              className="absolute top-2 right-2 text-muted-foreground p-2.5"
              onClick={() => {
                setImgAddress("");
              }}
            >
              <X />
            </Button>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

const ImageSlider = ({
  imgAddress = "",
  setImgAddress,
  activeIndex,
  setActiveIndex,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    if (!imgAddress) {
      setThumbsSwiper(null);
      setActiveIndex(0);
      setImgAddress(null);
    }
  }, [imgAddress, setActiveIndex, setImgAddress]);

  return (
    <div className="max-sm:relative size-full flex items-start flex-col justify-around max-[450px]:mt-0 max-sm:mt-10 ">
      {/* main slider */}
      <Swiper
        slidesPerView="auto"
        spaceBetween={10}
        onSlideChange={(value) => setActiveIndex(value.activeIndex)}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="rounded-lg w-full sm:w-96 overflow-hidden" 
      >
        {imgListData?.map((img, index) => (
          <SwiperSlide
            key={index}
            className="select-none !w-full sm:!size-96 overflow-hidden"
          >
            <Image
              src={img}
              alt={`Slide ${index}`}
              width={384} 
              height={384}
              quality={100}
              className="size-full object-cover"
            />
          </SwiperSlide>
        ))}
        {/* btns */}
        <div
          className={cn(
            "custom-prev backdrop-blur-md flex-center rounded-full size-8 text-center bg-zinc-300/60 absolute top-1/2 left-2 z-20 -translate-y-1/2 cursor-pointer",
            0 === activeIndex && "!hidden !pointer-events-none"
          )}
        >
          <ChevronLeft className="me-0.5" />
        </div>

        <div
          className={cn(
            imgListData.length - 1 === activeIndex &&
              "!hidden !pointer-events-none",
            "custom-next backdrop-blur-md flex items-center justify-center rounded-full size-8 text-center bg-zinc-300/60 absolute top-1/2 right-2 z-20 -translate-y-1/2 cursor-pointer"
          )}
        >
          <ChevronRight className="ms-0.5" />
        </div>
      </Swiper>

      <div className="w-full max-w-screen-lg sm:mx-[2%] max-sm:absolute max-sm:bottom-0 min-[530px]:bottom-[8%]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress
          modules={[FreeMode, Thumbs]}
          onSlideChange={(swiper) => setActiveIndex(swiper?.activeIndex)}
          className="mt-4 !w-full max-sm:!bg-black/15 max-sm:!backdrop-blur-sm max-sm:!py-2 "
        >
          {imgListData?.map((img, index) => (
            <SwiperSlide
              key={index}
              className="!w-20 !h-16 relative cursor-pointer duration-150 rounded-lg select-none "
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`Thumbnail ${index}`}
                width={96}
                height={96}
                quality={40}
                className="w-full h-full rounded-md object-cover relative z-0"
              />
              <span
                className={cn(
                  "invisible opacity-0 flex flex-col duration-100 ease-in-out justify-end items-center w-7 h-2.5 rounded-t-md bg-primary/70 absolute bottom-0 left-1/2 -translate-x-1/2 transform z-10",
                  activeIndex === index && "visible opacity-100"
                )}
              >
                <span className="w-4 h-1.5 block bg-white/75 rounded-t"></span>
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageProduct;
