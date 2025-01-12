// import Image from "next/image";
import Discount from "./discount";
import HeroSection from "@/components/layout/landing/hero-section";
import * as React from "react";

import AerobicSection from "./aerobic-section";
// import { Button } from "@/components/ui/button";
// import { ChevronRight } from "lucide-react";
import MyButtonLink from "@/components/my-components/my-btns";
import SliderSection from "../../my-components/my-slider";
import { CardType } from "@/types/card-type";

const baseDiscountCard: CardType = {
  name: "Nike sports set",
  imageHeader: "/image/Rectangle 1166(1).jpg",
  price: 400,
  minSize: "lg",
  maxSize: "xl",
  color: ["bg-zinc-100", "bg-zinc-900"],
};

const discountDataSection: CardType[] = Array.from(
  { length: 10 },
  (_, index) => ({
    ...baseDiscountCard,
    imageHeader: `/image/Rectangle 1166(${(index % 3) + 1}).jpg`,
  })
);

function Body() {
  return (
    <main className=" space-y-16 md:space-y-20">
      <HeroSection />
      <Discount />
      <AerobicSection />
      {/* this just margin */}
      <span className="block max-md:py-0.5"></span>

      <section className="bg-zinc-200">
        <div className="flex items-center justify-center">
          <h2 className="title-section rounded-xl pt-5 pb-3 max-md:pb-7">
            Special discount
          </h2>
        </div>

        <div className="flex items-center justify-center flex-col">
          <div className="w-full mb-2.5 max-md:hidden">
            <span className="w-full max-md:max-w-xs max-lg:max-w-[41rem] max-w-[57rem] block mx-auto ps-4">
              <MyButtonLink name="view all" />
            </span>
          </div>

          <div className="flex items-center justify-center">
            <SliderSection cardData={discountDataSection} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Body;
