import { Button } from "@/components/ui/button";
import {
  ArrowRightCircle,
  CalendarDaysIcon,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

const backgroundPattern = {
  backgroundColor: "#fffffe",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b6a589' fill-opacity='0.3' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
};

function HeroSection() {
  return (
    <section className="max-lg:px-[4%] px-[2%]">

      <div className=" max-w-7xl mx-auto ">
        <div className="flex max-md:w-full md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center z-0 relative">
          <div className=" space-y-4 w-[30rem] max-md:text-center max-md:mx-auto">
            <p className="text-zinc-600">راحت و امن خرید کنید!</p>

            <span className="block">
              <h1 className="space-y-2 text-[29px] font-medium">
                <span className="block  text-secondary ">
                  در کنار شما در مسیر سلامتی
                </span>
                <span className="block text-primary">
                  امروز به اهداف سلامتی خود برسید!
                </span>
              </h1>
            </span>
            <p className="text-zinc-600 pb-1">
              بزرگترین حراج فصل فیت‌لند، همین حالا بروید و محصولات را با تخفیف فوق‌العاده خریداری کنید!
            </p>

            <Button
              variant={"secondary"}
              className="text-white py-5 font font-semibold "
            >
              مشاهده محصولات <ArrowRightCircle className="font-medium" />
            </Button>
          </div>

          <div className="max-w-sm max-md:hidden">
            <Image
              src={"/svg/runner-hero-section.svg"}
              priority={true}
              width={250}
              height={250}
              className="size-full"
              unoptimized
              alt="image-hero-section"
            ></Image>
          </div>

          <ul className=" space-y-5 text-secondary font-medium text-[18px] max-lg:hidden">
            <li className="flex items-center justify-start gap-5">
              <Image
                src={"/svg/store-svgrepo-com(1).svg"}
                alt="store-icon"
                width={41}
                height={41}
              />
              <span className="flex flex-col items-start justify-center">
                <p>+ 300</p>
                <p className="text-zinc-900">تنوع محصولات</p>
              </span>
            </li>
            <li className="flex items-center justify-start gap-5">
              <ThumbsUp width={31} height={31} />
              <span className="flex flex-col items-start justify-center">
                <p>95%</p>
                <p className="text-zinc-900">رضایت مشتریان</p>
              </span>
            </li>
            <li className="flex items-center justify-start gap-5">
              <CalendarDaysIcon width={31} height={31} />
              <span className="flex flex-col items-start justify-center">
                <p>4 روز</p>
                <p className="text-zinc-900">از خرید تا تحویل</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <span className="block relative -z-10 h-28 -translate-y-20 max-md:hidden">
        <div className="size-full" style={backgroundPattern}/>
      </span>
    </section>
  );
}

export default HeroSection;
