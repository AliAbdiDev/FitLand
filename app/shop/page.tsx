import {
  MyProductCard,
  MyProductCardMobileSize,
} from "@/components/my-components/my-product-card";

import { cn } from "@/lib/utils";
import { SearchParams } from "@/types/next";
import Link from "next/link";
import Filters from "./components/Filters";
import SortAndFilterMobileSize from "./components/SortAndFilterMobileSize";
import React from "react";
import cardData from "./card-data";
import Layout from "@/components/layout/Layout";
const linksCategory = [
  { label: "ارزان‌ترین", query: "cheapest" },
  { label: "گران‌ترین", query: "most-expensive" },
  { label: "پرفروش‌ترین", query: "best-seller" },
  { label: "جدیدترین", query: "newest" },
  { label: "پربازدیدترین", query: "most-visited" },
];

async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const search = await searchParams;
  return (
    <Layout>
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
                <Link
                  href={{ query: { category: cate?.query } }}
                  className="block"
                >
                  {cate?.label}
                </Link>
              </li>
            ))}
          </ul>

          <SortAndFilterMobileSize sortData={linksCategory} />

          <div className="grid max-sm:grid-cols-1 max-[1260px]:grid-cols-2 min-[1260px]:grid-cols-3 gap-3 pt-3 lg:pt-7 max-sm:space-y-2">
            {cardData?.map((cards, index) => (
              <React.Fragment key={index}>
                <Link
                  href={"shop/" + cards?.id}
                  className="max-sm:hidden w-full block"
                >
                  <MyProductCard {...cards} />
                </Link>
                <Link href={"shop/" + cards?.id} className="sm:hidden block">
                  <MyProductCardMobileSize {...cards} />
                </Link>
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default ShopPage;
