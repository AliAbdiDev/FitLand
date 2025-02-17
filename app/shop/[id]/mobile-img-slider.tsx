"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import ImgSlider from "./img-slider";
import { X } from "lucide-react";
import { useReducer } from "react";
import {
  imageViewerActions,
  imageViewerInitialState,
  imageViewerReducer,
} from "./image-viewer-reducer";

const imgListData = Array.from({ length: 5 }, () => "/image/borwn-showse.png");

function MobileImgSlider() {
  const [state, dispatch] = useReducer(
    imageViewerReducer,
    imageViewerInitialState
  );
  const { setActiveIndex, setImgAddress } = imageViewerActions(dispatch);

  return (
    <div className="md:hidden w-full h-72">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ dynamicBullets: true, clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {imgListData?.map((img, index) => (
          <SwiperSlide key={index} className="!size-full">
            <div
              className="h-80 max-w-80 mx-auto w-full overflow-hidden cursor-pointer"
              onClick={() => {
                setImgAddress(img);
                setActiveIndex(index);
                console.log(img);
              }}
            >
              <Image
                alt={`image product ${index + 1}`}
                src={img || "/pic/img"}
                objectFit="cover"
                className="!size-full object-cover"
                quality={100}
                width={160}
                height={160}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: #ff7145 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>

      <Drawer
        open={!!state?.imgAddress}
        onOpenChange={(open) => setImgAddress(open ? state?.imgAddress : "")}
      >
        <DrawerContent className="h-full w-full p-0 rounded-t-none">
          <DrawerTitle className="sr-only">title</DrawerTitle>
          <ImgSlider
            activeIndex={state?.activIndex}
            setActiveIndex={setActiveIndex}
            setImgAddress={setImgAddress}
            imgAddress={state?.imgAddress as string}
            imgListData={imgListData}
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
    </div>
  );
}

export default MobileImgSlider;
