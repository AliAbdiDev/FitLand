"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { CardType } from "@/types/card-type";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";

function MySlider({ cardData }: { cardData: CardType[] }) {
  const plugin = useRef(Autoplay({ delay: 3000 }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={() => plugin.current.play()}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-md:max-w-xs max-lg:max-w-[41rem] max-w-[57rem]"
    >
      <CarouselContent className="-ml-1">
        {cardData?.map((items, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <Card className="rounded-xl p-0 m-1 border-zinc-300  h-[22rem]">
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
                  <CardTitle>{items?.name || "Null data Title"}</CardTitle>
                  <p className="">${items?.price}</p>
                  <p className="text-zinc-600 text-xs">
                    from size {items?.minSize} to {items?.maxSize}
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
                        alt="pic-prudocts"
                        loading="lazy"
                        width={20}
                        height={20}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      {(cardData?.length > 0 || cardData) && (
        <>
          <CarouselPrevious className="max-sm:hidden" />
          <CarouselNext className="max-sm:hidden" />
        </>
      )}
    </Carousel>
  );
}

export default MySlider;
