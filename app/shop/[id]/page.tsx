import { NextPageProps } from "@/types/next-type";
import Image from "next/image";
import cardData from "../card-data";
import DetailProduct from "./detial-product";

async function SinglePageProduct({ params }: NextPageProps) {
  const { id  } = await params;
  const findDataProduct = cardData.find((card) => card?.id === id);
  console.info(findDataProduct);
 
  return (
    <main className="min-h-screen px-[5%]">
      <section className="flex items-center justify-center gap-7 w-full ">
        {/* images section  */}
        <div className=" w-1/2 flex-center">
          <div className=" rounded-md overflow-hidden space-y-7 w-full">
            <span className=" h-96 block rounded-md w-full">
              <Image
                src={"/image/borwn-showse.png"}
                alt="product image"
                width={200}
                height={200}
                className="size-full object-cover"
                unoptimized
              />
            </span>

            <ul className="w-full flex items-center justify-between *:border *:border-zinc-300 *:rounded-lg">
              <li className="">
                <Image
                  src={"/image/borwn-showse.png"}
                  alt="product image"
                  width={90}
                  height={90}
                />
              </li>
              <li className="">
                <Image
                  src={"/image/borwn-showse.png"}
                  alt="product image"
                  width={90}
                  height={90}
                />
              </li>
              <li className="">
                <Image
                  src={"/image/borwn-showse.png"}
                  alt="product image"
                  width={90}
                  height={90}
                />
              </li>
              <li className="">
                <Image
                  src={"/image/borwn-showse.png"}
                  alt="product image"
                  width={95}
                  height={95}
                />
              </li>
              <li className="">
                <Image
                  src={"/image/borwn-showse.png"}
                  alt="product image"
                  width={95}
                  height={95}
                />
              </li>
            </ul>
          </div>
          <span className=""></span>
        </div>
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
