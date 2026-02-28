import {
  MyProductCard,
  MyProductCardMobileSize,
} from "@/components/my-components/my-product-card";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import type { SearchParams } from "@/types/next";
import Link from "next/link";
import React from "react";
import Filters from "./components/Filters";
import SortAndFilterMobileSize from "./components/SortAndFilterMobileSize";
import TrackedProductLink from "./components/TrackedProductLink";
import {
  getVisibleSportProducts,
  type ShopProductQuery,
} from "./mock-sport-products";

const linksCategory = [
  { label: "ارزان‌ترین", query: "cheapest" },
  { label: "گران‌ترین", query: "most-expensive" },
  { label: "پرفروش‌ترین", query: "best-seller" },
  { label: "جدیدترین", query: "newest" },
  { label: "پربازدیدترین", query: "most-visited" },
];

function getFirstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeShopQuery(search: Awaited<SearchParams>): ShopProductQuery {
  return {
    category: getFirstValue(search?.category),
    minPrice: getFirstValue(search?.minPrice),
    maxPrice: getFirstValue(search?.maxPrice),
    color: getFirstValue(search?.color),
    size: getFirstValue(search?.size),
    brands: getFirstValue(search?.brands),
  };
}

function compactQuery(query: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value && value.length > 0)
  );
}

async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const rawSearch = await searchParams;
  const search = normalizeShopQuery(rawSearch);
  const visibleProducts = getVisibleSportProducts(search);

  return (
    <Layout>
      <main className="min-h-screen px-[5%] w-full flex items-start justify-between">
        <Filters />

        <section className="w-9/12 max-lg:w-full">
          <ul className="flex items-start w-full gap-5 text-secondary ps-1 max-lg:hidden">
            {linksCategory.map((cate, index) => (
              <li
                className={cn(
                  "hover:underline hover:text-primary underline-offset-4 duration-200",
                  search.category === cate.query && "text-primary underline"
                )}
                key={index}
              >
                <Link
                  href={{
                    query: compactQuery({ ...search, category: cate.query }),
                  }}
                  className="block"
                >
                  {cate.label}
                </Link>
              </li>
            ))}
          </ul>

          <SortAndFilterMobileSize sortData={linksCategory} />

          {visibleProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center text-zinc-600 mt-3 lg:mt-7">
              هیچ محصولی با این فیلترها پیدا نشد.
            </div>
          ) : (
            <div className="grid max-sm:grid-cols-1 max-[1260px]:grid-cols-2 min-[1260px]:grid-cols-3 gap-3 pt-3 lg:pt-7 max-sm:space-y-2">
              {visibleProducts.map((product) => (
                <React.Fragment key={product.id}>
                  <TrackedProductLink
                    productId={product.id}
                    href={`/shop/${product.id}`}
                    className="max-sm:hidden w-full block"
                  >
                    <MyProductCard {...product} />
                  </TrackedProductLink>
                  <TrackedProductLink
                    productId={product.id}
                    href={`/shop/${product.id}`}
                    className="sm:hidden block"
                  >
                    <MyProductCardMobileSize {...product} />
                  </TrackedProductLink>
                </React.Fragment>
              ))}
            </div>
          )}
        </section>
      </main>
    </Layout>
  );
}

export default ShopPage;
