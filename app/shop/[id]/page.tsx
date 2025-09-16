import { NextPageProps } from "@/types/next";
import cardData from "../card-data";
import DetailProduct from "./detial-product";
import ImageProduct from "./image-product";
import MobileImgSlider from "./mobile-img-slider";

async function SinglePageProduct({ params }: NextPageProps) {
  const { id } = await params;
  const findDataProduct = cardData.find((card) => card?.id === id);
  console.info(findDataProduct);

  return (
    <main className="min-h-screen px-[5%] ">
      
      <section className="flex items-center justify-center md:gap-7 w-full max-md:flex-col max-sm:mt-5">
        <ImageProduct />
        <MobileImgSlider/>
        {/* text and detial Prodct */}
        <div className="space-y-3 *:block w-1/2 max-md:w-full max-md:mt-20">
          <span className="block">
            <div className="flex justify-between items-center  w-full">
              <h1 className="text-2xl">KD17</h1>
              <span className=" bg-[#e8e8eb] px-2 py-1 rounded-md flex-center gap-1">
                <p className="text-xs">3.2</p>
                <svg
                  className={"text-yellow-500 mb-0.5"}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                  width={16}
                  height={16}
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">کفش بسکتبال</p>
          </span>

          <div className="flex flex-col w-full space-y-2">
            <p className="text-2xl ">$50</p>
            <span className="flex items-center gap-3">
              <p className="text-muted-foreground line-through pe-3">$100</p>
              <span className="rounded-lg bg-primary text-sm text-white px-2.5 py-1.5 size-fit text-center">
                %50
              </span>
            </span>
          </div>

          <DetailProduct />
        </div>
      </section>
    </main>
  );
}

export default SinglePageProduct;
