import MyInput from "@/components/my-components/my-input";
import { Button } from "@/components/ui/button";
import { Award, LucideShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SideBar from "./landing/side-bar";


const firstList = [
  { id: 1, src: "/svg/star.svg", alt: "icon", label: "latest products" },
  { id: 2, src: "/svg/rad.svg", alt: "icon", label: "special discounts" },
  {
    id: 3,
    src: null,
    alt: "icon",
    label: "best sellers",
    icon: <Award width={19} height={19} className="text-primary" />,
  },
];

const secondList = [
  { id: 1, label: "masculine" },
  { id: 2, label: "feminine" },
  { id: 3, label: "childish" },
  { id: 4, label: "sports equipment" },
];

function Header() {
  return (
    <header className="w-full pt-6 max-w-7xl mx-auto flex flex-col gap-9 max-lg:px-[4%]">
      <nav className="w-full flex lg:items-center lg:justify-around gap-9 max-lg:flex-col-reverse items-center justify-center">
        <div className="flex items-center justify-around basis-1/4 max-lg:hidden  ">
          <Button className="rounded-lg px-3">
            <LucideShoppingBag />
          </Button>
          <Button variant={"outline"} className="rounded-lg">
            <User className="text-zinc-500" />
            <span className="border-r pr-2 border-zinc-300">Login</span>
            <span>Rigister</span>
          </Button>
        </div>

        <div className="w-full lg:basis-2/4 max-lg:flex items-center justify-start">
          <MyInput className="rounded-lg w-full" />
        </div>

        <div className="lg:basis-1/4 w-full max-lg:flex items-center justify-between">
          <Link href={"/"} className="flex justify-end">
            <Image src={"/svg/logo.svg"} alt="Logo" width={120} height={50} />
          </Link>

          <span className="block lg:hidden">
           <SideBar sideBarData={[...secondList, ...firstList]}/>
          </span>
        </div>
      </nav>

      <div className="w-full flex items-center justify-center gap-9 px-12  max-lg:hidden">
        <div className=" bg-amber-50 rounded-md py-2 w-full flex items-center justify-around">
          <ul className="flex-center flex-row-reverse gap-7">
            {firstList?.map((item) => (
              <li key={item.id}>
                <Link href={"/"} className="flex-center gap-2">
                  <span>
                    {item?.src ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={17}
                        height={17}
                      />
                    ) : (
                      item.icon
                    )}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex-center gap-7">
            {secondList?.map((item) => (
              <li key={item?.id}>
                <Link href={"/"}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
