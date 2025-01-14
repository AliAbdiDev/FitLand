import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  image: string;
  href: string;
  lightTitle: string;
  boldTitle: string;
}

function BanerSection({ image, href, boldTitle, lightTitle }: Props) {
  return (
    <>
      <section className="w-full h-[25rem] max-md:hidden relative">
        <Image
          src={image || "/image/view-all-products.jpg"}
          loading="lazy"
          unoptimized
          width={500}
          height={500}
          alt="view-all-products"
          className="size-full object-cover absolute top-0 left-0 -z-10"
        />
        <div className="flex items-center justify-start size-full ps-7">
          <span className="relative z-0 space-y-5 ps-2">
            <h2 className="title-section space-y-2">
              <span className="text-secondary !font-medium block  max-w-[25rem]">
                {lightTitle || "for good mood"}
              </span>
              <span className="text-secondary font-semibold block max-w-[22rem]">
                {boldTitle || "Get Baners and fitness equipment"}
              </span>
            </h2>

            <Link href={href || "#"} className="inline-block">
              <Button type="button" className="" variant={"secondary"}>
                View products <ArrowRightCircle />
              </Button>
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}

export default BanerSection;
