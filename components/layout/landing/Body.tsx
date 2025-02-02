import Image from "next/image";
import Discount from "./card-items";
import HeroSection from "@/components/layout/landing/hero-section";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BanerSection from "./baner-section";
// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
// import MyButtonLink from "@/components/my-components/my-btns";
// import SliderSection from "../../my-components/my-slider";
import { CardType } from "@/types/card-type";
import SliderSection from "./slider-section";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";

const baseDiscountCard: CardType = {
  name: "Nike sports set",
  imageHeader: "/image/Rectangle 1166(1).jpg",
  price: 400,
  minSize: "lg",
  maxSize: "xl",
  color: ["bg-zinc-900", "bg-zinc-100", "bg-zinc-900"],
};

const discountDataSection: CardType[] = Array.from(
  { length: 10 },
  (_, index) => ({
    ...baseDiscountCard,
    imageHeader: `/image/Rectangle 1166(${(index % 3) + 1}).jpg`,
  })
);
const baseNewShose: CardType = {
  name: "Nike shoes model S-2000",
  price: 400,
  imageHeader: "/image/Rectangle 1166(3).png",
  minSize: "l",
  maxSize: "xxl",
};

const newShoseDataSection: CardType[] = Array.from(
  { length: 10 },
  (_, index) => ({
    ...baseNewShose,
    image: [
      "/image/Rectangle 1166(1).png",
      "/image/Rectangle 1166(2).png",
      "/image/Rectangle 1166(3).png",
    ],
    imageHeader: `/image/Rectangle 1166(${(index % 3) + 1}).png`,
  })
);

const baseBicycle: CardType = {
  name: "Nike shoes model S-2000",
  price: 400,
  imageHeader: "/image/bicycle(1).jpg",
  color: ["bg-zinc-900", "bg-zinc-100", "bg-zinc-900"],
  minSize: "l",
  maxSize: "xxl",
};

const bicycleDataSection: CardType[] = Array.from(
  { length: 10 },
  (_, index) => ({
    ...baseBicycle,
    imageHeader: `/image/bicycle(${(index % 3) + 1}).jpg`,
  })
);

function Body() {
  return (
    <main className=" space-y-16 md:space-y-20">
      <HeroSection />
      <Discount />
      <BanerSection
        image={"/image/view-all-products.jpg"}
        href={""}
        lightTitle="for good mood"
        boldTitle="Get Baners and fitness equipment"
      />
      {/* this just gap */}
      <span className="block max-md:py-0.5"></span>

      <SliderSection
        cardData={discountDataSection}
        title="Special Discount"
        url=""
      />
      <SliderSection
        cardData={newShoseDataSection}
        title="latest sports shoes"
        url=""
      />

      <BanerSection
        lightTitle="To enjoy the route"
        boldTitle="Get a bike, skate and scooter"
        href=""
        image="/image/cyclist.jpg"
      />

      <SliderSection
        cardData={bicycleDataSection}
        title="Special Discount"
        url=""
      />

      <article className="max-w-md md:max-w-5xl lg:max-w-5xl mx-auto">
        <div className="w-full text-center pb-12">
          <h2 className="title-section">Latest in sports news</h2>
        </div>
              
        <div className="flex items-center lg:justify-between justify-center w-full gap-x-5 max-lg:gap-y-12 max-lg:flex-wrap *:w-1/2 max-md:*:w-full">
          
          <Card className="rounded-lg h-[30rem] border-zinc-300">
            <CardHeader className="!p-0 max-h-[15rem] w-full  rounded-t-lg  overflow-hidden">
              <Image
                unoptimized
                src={"/image/blog(2).png"}
                width={100}
                height={100}
                alt="blog"
                className="size-full object-cover"
              />
            </CardHeader>
            <CardContent className="pt-5 space-y-3">
              <CardTitle>
                Australia&lsquo;s defeat in the first step of the Women&lsquo;s
                World Cup!
              </CardTitle>
              <CardDescription className="text-black">
              The news indicates that the president of the football federation
              announced that every football player&lsquo;s salary will be
              increased by 50% in the current season.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant={"default"}>View the news <ArrowRightCircle/></Button>
            </CardFooter>
          </Card>
          <Card className="rounded-lg h-[30rem] border-zinc-300">
            <CardHeader className="!p-0 max-h-[15rem] w-full  rounded-t-lg  overflow-hidden">
              <Image
                unoptimized
                src={"/image/blog.jpg"}
                width={100}
                height={100}
                alt="blog"
                className="size-full object-cover"
              />
            </CardHeader>
            <CardContent className="pt-5 space-y-3">
              <CardTitle>
                Australia&lsquo;s defeat in the first step of the Women&lsquo;s
                World Cup!
              </CardTitle>
              <CardDescription className="text-black">
                The teams competed against each other on the first day of the
                Women&lsquo;s World Cup in Madrid, Spain.
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant={"default"}>View the news <ArrowRightCircle/></Button>
            </CardFooter>
          </Card>
        </div>
      </article>
    </main>
  );
}

export default Body;
