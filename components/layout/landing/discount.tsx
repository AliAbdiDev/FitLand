import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import Image from "next/image";

function Discount() {
  return (
    <section className="max-w-7xl mx-auto flex items-center justify-center">
     <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-9 max-md:space-y-12 ">
     <Card className="h-96 max-w-80 shadow-none border-none max-lg:hidden md:mt-20 p-0">
        <CardContent className="flex items-start size-full justify-end flex-col *:p-0 gap-2 p-0">
          <CardContent>The latest products</CardContent>
          <CardDescription>
            Latest products with free shipping and get it delivered to your door
            as soon as possible

            <Button variant={'default'} className="mt-3">View all products <ArrowLeftCircle className="font-medium"/></Button>
          </CardDescription>
        </CardContent>
      </Card>

      <Card className="h-96 max-w-80  relative -z-0 shadow-none border-none">
        <div className=" h-96 overflow-hidden rounded-lg">
          <Image
            unoptimized
            src={"/image/Rectangle 1167(18).png"}
            alt={"pic-discount"}
            className="w-full h-full object-cover"
            width={50}
            height={50}
          />
          <span className="absolute -bottom-44 w-full h-38 z-0 -translate-y-32 block overflow-hidden rounded-lg">
            <Image
              src={"/svg/Vector 658.svg"}
              alt="pic"
              width={100}
              height={50}
              className="w-full object-cover transform scale-x-[-1]"
            />

            <span className="text-white absolute bottom-0 z-0 block w-full p-4 space-y-2">
              <CardTitle>Nike Seasonal Discounts</CardTitle>
              <CardDescription>
                Discover the latest seasonal discounts on Nike brand products
              </CardDescription>
            </span>
          </span>
        </div>
      </Card>
      <Card className="h-96 max-w-80  relative -z-0 shadow-none border-none">
          <div className=" h-96 overflow-hidden rounded-lg">
            <Image
              unoptimized
              src={"/image/Rectangle 1170.png"}
              alt={"pic-discount"}
              className="w-full h-full object-cover"
              width={50}
              height={50}
            />
            <span className="absolute -bottom-44 w-full h-38 z-0 -translate-y-32 block overflow-hidden rounded-lg">
              <Image
                src={"/svg/Vector 658.svg"}
                alt="pic"
                width={100}
                height={50}
                className="w-full object-cover transform scale-x-[-1]"
              />

              <span className="text-white absolute bottom-0 z-0 block w-full p-4 space-y-2">
                <CardTitle>50% Off All Products</CardTitle>
                <CardDescription>
                  Get a massive 50% discount on all products. Don’t miss out
                </CardDescription>
              </span>
            </span>
          </div>
      </Card>
     </div>
    </section>
  );
}

export default Discount;
