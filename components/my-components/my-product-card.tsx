import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const RatingComponent = ({
  numberActiveStars,
  numberExistingStars = 5,
}: {
  numberActiveStars: string | number;
  numberExistingStars?: number;
}) => (
  <div className="flex items-center space-x-1">
    {Array.from({ length: numberExistingStars }, (_, index) => (
      <svg
        key={index}
        className={cn(
          "size-4 text-zinc-200",
          index < Number(numberActiveStars) && "text-yellow-500",
        )}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    ))}
  </div>
);

interface Props {
  imageSrc: string;
  title: string;
  numberActiveStars?: string | null;
  minSize: string;
  maxSize: string;
  price: string;
  discountedPrice: string | null;
  classNameColorProducts?: string[];
}

function MyProductCard({
  imageSrc,
  title,
  numberActiveStars = null,
  minSize,
  maxSize,
  discountedPrice = null,
  price,
  classNameColorProducts,
}: Props) {
  return (
    <>
      <Card className="text-black overflow-hidden h-[500px] flex justify-between gap-2 flex-col">
        <CardHeader className="p-0 max-h-80 w-full overflow-hidden">
          <Image
            src={imageSrc || "/image/pic"}
            alt={title?.toLowerCase() || "image"}
            width={50}
            height={50}
            className="size-full object-cover"
            unoptimized
          />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <CardTitle className="text-lg font-medium">{title}</CardTitle>

            {numberActiveStars && (
              <RatingComponent numberActiveStars={numberActiveStars} />
            )}
          </div>

          <div className="flex justify-center flex-col gap-1">
            <p className="">
              از سایز {minSize} تا سایز {maxSize}
            </p>
            <p>
              <span className="pe-3">{price} تومان</span>
              {discountedPrice && (
                <span className="line-through text-zinc-500">
                  {discountedPrice} تومان
                </span>
              )}
            </p>
          </div>
          <div className="pt-1 parent-color-product">
            {classNameColorProducts?.map((color, index) => (
              <span className={color || ""} key={index}></span>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function MyProductCardMobileSize({
  imageSrc,
  title,
  numberActiveStars = null,
  minSize,
  maxSize,
  discountedPrice = null,
  price,
  classNameColorProducts,
}: Props) {
  return (
    <div className="text-sm border-b border-b-zinc-200 last:border-none">
      <div className="w-full rounded-lg flex items-center justify-between">
        <span className="space-y-2 block">
          {/* title section */}
          <div className="">
            <p>{title}</p>
            <p className="text-zinc-600">
              از سایز {minSize} تا سایز {maxSize}
            </p>
          </div>
          {/* rate stars */}
          <div className="">
            <RatingComponent numberActiveStars={numberActiveStars as string} />
          </div>
          {/* price section */}
          <div className="flex items-center justify-start gap-2 pt-1">
            <p className="">{price} تومان</p>
            {discountedPrice && (
              <p className="text-zinc-500 line-through">
                {discountedPrice} تومان
              </p>
            )}
          </div>
          {/* color product */}
          <div className="parent-color-product">
            {classNameColorProducts?.map((color, index) => (
              <span className={color || ""} key={index}></span>
            ))}
          </div>
        </span>

        <span className="block">
          <Image src={imageSrc} width={150} height={150} alt="تصویر محصول" />
        </span>
      </div>
    </div>
  );
}

export { MyProductCard, MyProductCardMobileSize };

