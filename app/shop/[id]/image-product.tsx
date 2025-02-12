"use client";
import Image from "next/image";
import { useState } from "react";

const imageData = {
  initailImg: "/image/borwn-showse.png",

  imgListData: [
    "/image/borwn-showse.png",
    "/image/borwn-showse.png",
    "/image/borwn-showse.png",
    "/image/borwn-showse.png",
    "/image/borwn-showse.png",
  ],
};

function ImageProduct() {
  const [imgAddress, setImgAddress] = useState<string | null>(null);
  return (
    <>
      <div className=" w-1/2 flex-center">
        <div className=" rounded-md overflow-hidden space-y-7 w-full">
          <span
            className=" h-96 block rounded-md w-full"
            onClick={() => {
              setImgAddress(imageData?.initailImg || "/pic/img.png");
            }}
          >
            <Image
              src={imageData?.initailImg || "/pic/img.png"}
              alt="product image"
              width={200}
              height={200}
              className="size-full object-cover"
              unoptimized
            />
          </span>

          <ul className="w-full flex items-center justify-between *:border *:border-zinc-300 *:rounded-lg">
            {imageData?.imgListData?.map((src, index) => (
              <li className="" key={index}>
                <Image
                  src={src || "/pic/img.png"}
                  alt="product image"
                  width={90}
                  height={90}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <dialog className="" open={imgAddress ? true : false} >
       <div className="size-full ">
       <Image
          src={imgAddress|| '/pic/img.png'}
          alt="product image"
          width={200}
          height={200}
          className="size-full object-contain"
        />
       </div>
      </dialog>
    </>
  );
}

export default ImageProduct;
