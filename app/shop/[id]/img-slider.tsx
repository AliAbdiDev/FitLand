"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImgSliderProps {
  imgAddress?: string;
  setImgAddress: (src:string) => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  imgListData?: string[];
}

function ImgSlider({
  imgAddress = "",
  setImgAddress,
  activeIndex,
  setActiveIndex,
  imgListData = [],
}: ImgSliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  useEffect(() => {
    if (!imgAddress) {
      setThumbsSwiper(null);
      setActiveIndex(0);
      setImgAddress('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgAddress]);

  return (
    <>
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
              className="select-none !w-full !h-96 sm:!size-96 overflow-hidden"
            >
              <Image
                src={img}
                alt={`Slide ${index}`}
                width={384}
                height={384}
                quality={100}
                className="size-full object-cover"
                draggable={false}
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

        <div className="w-full max-w-screen-lg sm:mx-[2%] h-fitt max-sm:absolute max-sm:bottom-0">
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
                className="!w-20 !h-16 md:!size-24 relative cursor-pointer duration-150 rounded-lg select-none "
              >
                <Image
                  draggable={false}
                  src={img || "/placeholder.svg"}
                  alt={`Thumbnail ${index}`}
                  width={96}
                  height={96}
                  quality={40}
                  className="size-full rounded-md object-cover relative z-0"
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
    </>
  );
}

export default ImgSlider;
