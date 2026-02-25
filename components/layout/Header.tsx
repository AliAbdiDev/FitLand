import MyInput from "@/components/my-components/my-input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  clearAuthCookie,
  clearAuthUserCookie,
  AUTH_COOKIE_NAME,
} from "@/app/api/lib/auth";
import {
  AUTH_USER_COOKIE_NAME,
  decodeMockAuthUserCookie,
} from "@/lib/mock-auth-session";
import { Award, LucideShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SideBar from "./landing/side-bar";

const firstList = [
  {
    id: 1,
    src: "/svg/star.svg",
    alt: "icon",
    label: "جدیدترین محصولات",
    url: "/shop",
  },
  {
    id: 2,
    src: "/svg/rad.svg",
    alt: "icon",
    label: "تخفیف‌های ویژه",
    url: "/shop",
  },
  {
    id: 3,
    src: null,
    alt: "icon",
    label: "پرفروش‌ترین‌ها",
    icon: <Award width={19} height={19} className="text-primary" />,
    url: "/shop",
  },
];

const secondList = [
  { id: 1, label: "مردانه", url: "/shop" },
  { id: 2, label: "زنانه", url: "/shop" },
  { id: 3, label: "کودک", url: "/shop" },
  { id: 4, label: "تجهیزات ورزشی", url: "/shop" },
];

async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const authUserCookie = cookieStore.get(AUTH_USER_COOKIE_NAME)?.value;
  const authUser = decodeMockAuthUserCookie(authUserCookie);
  const isLoggedIn = Boolean(accessToken && authUser);
  const userLabel = authUser?.name?.trim() || authUser?.email || "کاربر";

  async function logoutAction() {
    "use server";

    await clearAuthCookie();
    await clearAuthUserCookie();
    redirect("/");
  }

  return (
    <header className="mx-auto flex w-full flex-col gap-9 px-[4%] pb-7 pt-6 sm:pb-20">
      <nav className="flex w-full items-center justify-center gap-9 max-lg:flex-col-reverse lg:items-center lg:justify-around">
        <div className="flex basis-1/4 items-center justify-start gap-2 max-lg:hidden">
        
          <Button asChild className="rounded-lg px-3">
            <Link href="/cart">
              <LucideShoppingBag />
            </Link>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-lg"
                  aria-label="منوی حساب کاربری"
                >
                  <User className="text-zinc-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="truncate text-right">
                  {userLabel}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="justify-end text-right">
                  <Link href="/profile">پروفایل</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={logoutAction}>
                  <DropdownMenuItem
                    asChild
                    className="justify-end text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                  >
                    <button type="submit">خروج از حساب</button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-lg">
                <User className="text-zinc-500" />
                <span className="border-l border-zinc-300 pl-2">ورود</span>
                <span>ثبت نام</span>
              </Button>
            </Link>
          )}
        </div>

        <div className="w-full items-center justify-start max-lg:flex lg:basis-2/4">
          <MyInput className="w-full rounded-lg" />
        </div>

        <div className="w-full items-center justify-between max-lg:flex lg:basis-1/4">
          <Link href="/" className="flex justify-end">
            <Image src="/svg/logo.svg" alt="لوگو" width={120} height={50} />
          </Link>

          <span className="block lg:hidden">
            <SideBar sideBarData={[...secondList, ...firstList]} />
          </span>
        </div>
      </nav>

      <div className="flex w-full items-center justify-center gap-9 max-lg:hidden">
        <div className="w-full rounded-md bg-amber-50 py-2 flex items-center justify-around">
          <ul className="flex-center flex-row-reverse gap-7">
            {firstList.map((item) => (
              <li key={item.id}>
                <Link href={item.url} className="flex-center gap-2">
                  <span>
                    {item.src ? (
                      <Image src={item.src} alt={item.alt} width={17} height={17} />
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
            {secondList.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
