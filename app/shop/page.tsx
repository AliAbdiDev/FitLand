import MyProductCard from "@/components/my-components/my-product-card";

import { cn } from "@/lib/utils";
import { SearchParams } from "@/types/next-type";
import Link from "next/link";
import Filters from "./components/Filters";
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
    numberActiveStars: "3",
    classNameColorProducts: ["bg-zinc-500", "bg-zinc-100", "bg-zinc-500"],
  },
];

async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const search = await searchParams;
  return (
    <>
      <main className="min-h-96 px-[5%] w-full flex items-start justify-between ">
        
          <Filters />
         
        <section className="w-9/12 max-lg:mx-auto max-sm:w-full">
          <ul className="flex items-center justify-start w-full gap-7 text-secondary ps-1 max-md:hidden">
            {linksCategory?.map((cate, index) => (
              <li
                className={cn(
                  search?.category === cate?.query && "text-primary underline"
                )}
                key={index}
              >
                <Link href={{ query: { category: cate?.query } }}>
                  {cate?.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid max-md:grid-cols-1 max-[1260px]:grid-cols-2 min-[1260px]:grid-cols-3 gap-3 pt-7">
            {cardData?.map((cardData, index) => (
              <MyProductCard key={index} {...cardData} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default ShopPage;
