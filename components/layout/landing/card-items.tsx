import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CardItems() {
  return (
    <section className="max-w-7xl mx-auto flex items-center justify-center max-md:mb-16">
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-9 max-md:space-y-12 ">
        <Card className="h-96 max-w-80 shadow-none border-none max-lg:hidden md:mt-20 p-0">
          <CardContent className="flex items-start size-full justify-end flex-col *:p-0 gap-2 p-0">
            <CardContent>جدیدترین محصولات</CardContent>
            <CardDescription>
              جدیدترین محصولات با ارسال رایگان و تحویل سریع درب منزل شما
              <Button variant={"default"} className="mt-3">
                مشاهده همه محصولات <ArrowRightCircle className="font-medium" />
              </Button>
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="h-96 max-w-80  relative -z-0 shadow-none border-none">
          <div className=" h-96 overflow-hidden rounded-lg">
            <Image
              unoptimized
              src={"/image/Rectangle 1167(7).png"}
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
                <CardTitle>تخفیف‌های فصلی نایکی</CardTitle>
                <CardDescription>
                  جدیدترین تخفیف‌های فصلی محصولات برند نایکی را کشف کنید
                </CardDescription>
              </span>
            </span>
          </div>
        </Card>

        <Card className="h-96 max-w-80  relative -z-0 shadow-none border-none">
          <div className=" h-96 overflow-hidden rounded-lg">
            <span className="absolute top-0 left-0 h-[27.2rem] w-full z-10 backdrop-blur-md block bg-black/60 rounded-lg lg:hidden">
              <div className="size-full flex flex-col items-center justify-end pb-10 text-center gap-5 p-3 text-white">
                <p className="text-lg max-w-[17rem]">
                  با یک کلیک وارد دنیای محصولات جدید شوید
                </p>
                <Link
                  href={"/"}
                  className="border-2 border-white py-2 px-3 rounded-lg"
                >
                  جدیدترین محصولات
                </Link>
              </div>
            </span>
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
                <CardTitle>50% تخفیف همه محصولات</CardTitle>
                <CardDescription>
                  از تخفیف فوق‌العاده 50% روی همه محصولات استفاده کنید. از دست ندهید
                </CardDescription>
              </span>
            </span>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default CardItems;
