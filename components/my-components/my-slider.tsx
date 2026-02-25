"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CardType } from "@/types/card";
import type { KeenSliderPlugin } from "keen-slider/react";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

function MySlider({ cardData }: { cardData: CardType[] }) {
  const autoplay = useMemo<KeenSliderPlugin>(
    () => (slider) => {
      let timeout: ReturnType<typeof setTimeout> | null = null;
      let mouseOver = false;

      const clearNextTimeout = () => {
        if (!timeout) {
          return;
        }

        clearTimeout(timeout);
        timeout = null;
      };

      const nextTimeout = () => {
        clearNextTimeout();

        if (mouseOver || cardData.length <= 1) {
          return;
        }

        timeout = setTimeout(() => {
          slider.next();
        }, 3000);
      };

      const onMouseEnter = () => {
        mouseOver = true;
        clearNextTimeout();
      };

      const onMouseLeave = () => {
        mouseOver = false;
        nextTimeout();
      };

      slider.on("created", () => {
        slider.container.addEventListener("mouseenter", onMouseEnter);
        slider.container.addEventListener("mouseleave", onMouseLeave);
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
      slider.on("destroyed", () => {
        slider.container.removeEventListener("mouseenter", onMouseEnter);
        slider.container.removeEventListener("mouseleave", onMouseLeave);
        clearNextTimeout();
      });
    },
    [cardData.length]
  );

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      rtl: true,
      loop: cardData.length > 1,
      slides: {
        origin: "auto",
        perView: 1,
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: {
            origin: "auto",
            perView: 2,
            spacing: 16,
          },
        },
        "(min-width: 1024px)": {
          slides: {
            origin: "auto",
            perView: 3,
            spacing: 16,
          },
        },
      },
    },
    [autoplay]
  );

  if (!cardData?.length) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="relative w-full max-md:max-w-xs max-lg:max-w-[41rem] max-w-[57rem]"
    >
      <div ref={sliderRef} className="keen-slider">
        {cardData.map((items, index) => (
          <div key={index} className="keen-slider__slide px-2 py-1">
            <Card className="rounded-xl p-0 m-1 border-zinc-300  h-[22rem] max-sm:max-w-[90%] mx-auto">
              <CardHeader className="p-0 overflow-hidden w-full rounded-t-xl -translate-y-1 border-none h-[12rem]">
                <Image
                  src={items?.imageHeader || "/image/Rectangle 1166(2).jpg"}
                  alt={items?.name.toLowerCase() || "pic"}
                  className="size-full object-cover"
                  loading="lazy"
                  width={300}
                  height={300}
                />
              </CardHeader>

              <CardContent className="flex items-start justify-center flex-col gap-3 px-4 py-5">
                <div className="space-y-1.5">
                  <CardTitle>{items?.name || "عنوان داده خالی"}</CardTitle>
                  <p className="">{items?.price} تومان</p>
                  <p className="text-zinc-600 text-xs">
                    از سایز {items?.minSize} تا {items?.maxSize}
                  </p>
                </div>
                <div className="flex -space-x-[0.525rem] *:block *:rounded-full *:ring-2 *:ring-background *:size-5">
                  {items?.color?.map((colorClassname, index) => (
                    <span className={cn(colorClassname)} key={index}></span>
                  ))}
                </div>
                {items?.image && (
                  <div className="flex items-center justify-start gap-2 *:w-9 *:h-7 *:size-full *:object-cover w-full">
                    {items?.image.map((img, index) => (
                      <Image
                        key={index}
                        src={img || "/image/pic"}
                        alt="تصویر محصولات"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={img || ""}
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {cardData.length > 1 && (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => instanceRef.current?.prev()}
            className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background/90 max-sm:hidden"
            aria-label="Slide previous"
          >
            <ChevronRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => instanceRef.current?.next()}
            className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-background/90 max-sm:hidden"
            aria-label="Slide next"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
}

export default MySlider;
