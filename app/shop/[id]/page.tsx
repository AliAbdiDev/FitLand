import { NextPageProps } from "@/types/next-type";
import cardData from "../card-data";
import DetailProduct from "./detial-product";
import ImageProduct from "./image-product";

async function SinglePageProduct({ params }: NextPageProps) {
  const { id  } = await params;
  const findDataProduct = cardData.find((card) => card?.id === id);
  console.info(findDataProduct);
 
  return (
    <main className="min-h-screen px-[5%]">
      <section className="flex items-center justify-center gap-7 w-full ">
        <ImageProduct />
        {/* text and detial Prodct */}
        <div className="space-y-3 *:block w-1/2">
          <span className="">
            <h1>KD17</h1>
            <p>Basketball shoes</p>
          </span>

          <span className="flex flex-col w-full space-y-2">
            <div className="flex items-center gap-2">
              <p className="">$50</p>
              <p className="text-muted-foreground line-through">$100</p>
            </div>
            <span className="rounded-lg bg-primary text-sm text-white block px-2 py-1.5 size-fit">
              %50
            </span>
          </span>

          <DetailProduct />
        </div>
      </section>
    </main>
  );
}

export default SinglePageProduct;
