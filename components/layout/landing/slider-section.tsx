import { CardType } from "@/types/card";
import MyButtonLink from "@/components/my-components/my-btns";
import Slider from "@/components/my-components/my-slider";
import Link from "next/link";

interface Props {
  title: string;
  cardData: CardType[];
  url: string;
  nameBtn?: string;
}

function SliderSection({ title, cardData, url, nameBtn }: Props) {
  return (
    <section className="bg-zinc-200 pb-16 pt-3">
      <div className="flex items-center justify-center">
        <h2 className="title-section rounded-xl pt-6 pb-3 max-md:pb-9">
          {title || "Special discount"}
        </h2>
      </div>

      <div className="flex items-center justify-center flex-col">
        <div className="w-full mb-2.5 max-md:hidden">
          <span className="w-full max-md:max-w-xs max-lg:max-w-[41rem] max-w-[57rem] block mx-auto pe-4">
            <Link href={url || "#"}>
              <MyButtonLink name={nameBtn || "مشاهده همه"} />
            </Link>
          </span>
        </div>

        <div className="flex items-center justify-center">
          <Slider cardData={cardData} />
        </div>
      </div>
    </section>
  );
}

export default SliderSection;
