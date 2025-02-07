import {
  MyProductCard,
  MyProductCardMobileSize,
} from "@/components/my-components/my-product-card";

import { cn } from "@/lib/utils";
import { SearchParams } from "@/types/next-type";
import Link from "next/link";
import Filters from "./components/Filters";
import SortAndFilterMobileSize from "./components/SortAndFilterMobileSize";
const linksCategory = [
  { label: "cheapest", query: "cheapest" },
  { label: "most expensive", query: "most-expensive" },
  { label: "best seller", query: "best-seller" },
  { label: "newest", query: "newest" },
  { label: "most visited", query: "most-visited" },
];

const cardData = [
  {
    imageSrc: "/image/borwn-showse.png",
    title: "Brown Shoes",
    minSize: "lg",
    maxSize: "xl",
    price: "99.99",
    discountedPrice: "79.99",
    numberActiveStars: "5",
    classNameColorProducts: ["bg-zinc-500", "bg-zinc-100", "bg-zinc-500"],
  },
  {
    imageSrc: "/image/borwn-showse.png",
    title: "Brown Shoes",
    minSize: "lg",
    maxSize: "xl",
    price: "99.99",
    discountedPrice: "79.99",
    numberActiveStars: "3",
    classNameColorProducts: ["bg-zinc-500", "bg-zinc-100", "bg-zinc-500"],
  },
  {
    imageSrc: "/image/borwn-showse.png",
    title: "Brown Shoes",
    minSize: "lg",
    maxSize: "xl",
    price: "99.99",
    discountedPrice: "79.99",
    numberActiveStars: "4",
    classNameColorProducts: ["bg-zinc-500", "bg-zinc-100", "bg-zinc-500"],
  },
  {
    imageSrc: "/image/borwn-showse.png",
    title: "Brown Shoes",
    minSize: "lg",
    maxSize: "xl",
    price: "99.99",
    discountedPrice: "79.99",
    numberActiveStars: "1",
    classNameColorProducts: ["bg-zinc-500", "bg-zinc-100", "bg-zinc-500"],
  },
];

async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const search = await searchParams;
  return (
    <>
      <main className="min-h-screen px-[5%] w-full flex items-start justify-between">
        
        <Filters />

        <section className="w-9/12 max-lg:w-full">
          <ul className="flex items-start   w-full gap-5 text-secondary ps-1 max-lg:hidden">
            {linksCategory?.map((cate, index) => (
              <li
                className={cn(
                  search?.category === cate?.query && "text-primary underline"
                )}
                key={index}
              >
                <Link href={{ query: { category: cate?.query } }} className="block">
                  {cate?.label}
                </Link>
              </li>
            ))}
          </ul>

          <SortAndFilterMobileSize sortData={linksCategory}/> 

          <div className="grid max-sm:grid-cols-1 max-[1260px]:grid-cols-2 min-[1260px]:grid-cols-3 gap-3 pt-3 lg:pt-7 max-sm:space-y-2">
            {cardData?.map((cardData, index) => (
              <>
                <div className="max-sm:hidden w-full" key={index}>
                  <MyProductCard {...cardData} />
                </div>
                <div className="sm:hidden" key={index+'mobile-size'}>
                  <MyProductCardMobileSize {...cardData} />
                </div>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default ShopPage;
