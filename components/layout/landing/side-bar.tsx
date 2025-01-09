"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SideBarData = {
  id: number;
  label: string;
  url: string;
}[];

function SideBar({ sideBarData: manList }: { sideBarData: SideBarData }) {
  const path = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side={"left"} className="px-2 py-3">
        <aside className="size-full px-3 py-3">
          <SheetHeader className="border-b border-zinc-300 pb-4 space-y-3">
            <SheetTitle className="sr-only">sidebar fitland</SheetTitle>

            <Image src={"/svg/logo.svg"} width={80} height={80} alt="logo" />
            <div className="w-full text-start ">
              <Link href={"/"} className="text-primary underline text-sm">
                shopping cart
              </Link>
            </div>
          </SheetHeader>
          {/* body list */}
          <SheetTitle className="pt-4 pb-2">Find What You Need</SheetTitle>
          <ScrollArea className="text-start space-y-1 border-b border-zinc-300 pb-4 pe-3">
            <ul className=" space-y-1.5 max-h-64">
              {manList?.map((item, index) => (
                <li
                  key={index}
                  className={cn(
                    "p-1.5 rounded-lg",
                    path.startsWith(item?.url) && "bg-primary/40"
                  )}
                >
                  {item?.label}
                </li>
              ))}
            </ul>
          </ScrollArea>

          <SheetFooter className="w-full flex !items-start !justify-center pt-4 !text-start !flex-col">
            <SheetTitle className="pb-4 !text-lg">Contact link</SheetTitle>
            <ul className=" space-y-2 *:text-start">
              <li className="">
                <Link
                  href={"https://github.com/AliAbdiDev"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center  text-start w-full"
                >
                  <div className="w-1/3">
                    <Image
                      src={"/svg/github-icon.svg"}
                      alt="github"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p className="w-2/3 !underline"> Github</p>
                </Link>
              </li>
              <li className="w-full">
                <Link
                  href={"mailto:aliabdidev@gmail.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center  text-start w-full"
                >
                  <div className="w-1/3">
                    <Image
                      src={"/svg/email-svgrepo-com.svg"}
                      alt="github"
                      width={21}
                      className="text-black"
                      height={21}
                    />
                  </div>
                  <p className="w-2/3 !underline">Email</p>
                </Link>
              </li>
              <li className="">
                <Link
                  href={"https://t.me/ALI_Abdiy"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-center  text-start w-full"
                >
                  <div className="w-1/3">
                    <Image
                      src={"/svg/telegram.svg"}
                      alt="github"
                      width={21}
                      className="text-black"
                      height={21}
                    />
                  </div>
                  <p className="w-2/3 sm:!underline">
                    Telegram
                  </p>
                </Link>
              </li>
            </ul>
          </SheetFooter>
        </aside>
      </SheetContent>
    </Sheet>
  );
}

export default SideBar;
