import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const RatingComponent = ({ activeStar }: { activeStar: boolean }) => (
  <>
    <svg
      className={cn(
        "size-4 ms-1 text-zinc-200",
        activeStar && "text-yellow-500"
      )}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  </>
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
      <Card className="text-black overflow-hidden">
        <CardHeader className="p-0 max-h-72 w-full overflow-hidden">
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
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <RatingComponent
                    activeStar={index < Number(numberActiveStars)}
                    key={index}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center flex-col gap-1">
            <p className="">
              form size {minSize} to size {maxSize}
            </p>
            <p>
              <span className="pe-3">${price}</span>
              {discountedPrice && (
                <span className="line-through text-zinc-500">
                  ${discountedPrice}
                </span>
              )}
            </p>
          </div>
          <div className="pt-1 flex -space-x-[0.525rem] *:block *:rounded-full *:ring-2 *:ring-background *:size-5">
            {classNameColorProducts?.map((color, index) => (
              <span className={color || ""} key={index}></span>
            ))}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}

export default MyProductCard;
