import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FileText, LogOut, PencilLine, ShieldCheck, UserRound } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProfileLatestSeenProducts from "@/components/profile/ProfileLatestSeenProducts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clearAuthCookie, clearAuthUserCookie, AUTH_COOKIE_NAME } from "@/app/api/lib/auth";
import { AUTH_USER_COOKIE_NAME, decodeMockAuthUserCookie } from "@/lib/mock-auth-session";

const mockInvoices = [
  { id: "INV-1404-001", date: "۱۴۰۴/۱۲/۰۱", total: "۱,۳۵۰,۰۰۰ تومان", status: "پرداخت شده" },
  { id: "INV-1404-002", date: "۱۴۰۴/۱۱/۲۳", total: "۸۹۰,۰۰۰ تومان", status: "ارسال شده" },
  { id: "INV-1404-003", date: "۱۴۰۴/۱۰/۳۰", total: "۴۲۰,۰۰۰ تومان", status: "تکمیل شده" },
];

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const authUserCookie = cookieStore.get(AUTH_USER_COOKIE_NAME)?.value;
  const authUser = decodeMockAuthUserCookie(authUserCookie);

  if (!accessToken || !authUser) {
    redirect("/login");
  }

  const userLabel = authUser.name?.trim() || authUser.email;
  const userInitial = (userLabel || "ک").trim().charAt(0).toUpperCase();

  async function logoutAction() {
    "use server";

    await clearAuthCookie();
    await clearAuthUserCookie();
    redirect("/");
  }

  return (
    <Layout>
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="size-14 border border-border">
                    <AvatarFallback className="text-base font-bold text-foreground">
                      {userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h1 className="text-xl font-bold text-foreground">پروفایل کاربر</h1>
                    <p className="text-sm text-muted-foreground">{userLabel}</p>
                    <p className="text-xs text-muted-foreground">نقش: {authUser.role || "user"}</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                  <ShieldCheck className="size-4" />
                  حساب فعال
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <div className="space-y-6">
              <Card className="rounded-2xl border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">آیتم‌های پروفایل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    href="#profile-detail"
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-foreground transition hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <UserRound className="size-4 text-muted-foreground" />
                      ویرایش جزئیات پروفایل
                    </span>
                    <PencilLine className="size-4 text-muted-foreground" />
                  </Link>

                  <Link
                    href="#invoices"
                    className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-foreground transition hover:bg-muted"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground" />
                      مشاهده فاکتورهای فروش
                    </span>
                    <span className="text-xs text-muted-foreground">{mockInvoices.length} مورد</span>
                  </Link>

                  <form action={logoutAction}>
                    <Button type="submit" variant="destructive" className="w-full rounded-lg">
                      <LogOut className="size-4" />
                      خروج از حساب
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card id="profile-detail" className="rounded-2xl border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">جزئیات پروفایل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="rounded-lg border border-border px-4 py-3">
                    <p className="text-xs text-muted-foreground">نام کاربر</p>
                    <p className="mt-1 font-medium text-foreground">{authUser.name || "ثبت نشده"}</p>
                  </div>
                  <div className="rounded-lg border border-border px-4 py-3">
                    <p className="text-xs text-muted-foreground">ایمیل</p>
                    <p className="mt-1 font-medium text-foreground">{authUser.email}</p>
                  </div>
                  <Button type="button" variant="outline" className="w-full rounded-lg">
                    <PencilLine className="size-4" />
                    ویرایش جزئیات پروفایل
                  </Button>
                </CardContent>
              </Card>

              <Card id="invoices" className="rounded-2xl border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">فاکتورهای فروش</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="rounded-lg border border-border px-4 py-3 text-sm"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-foreground">{invoice.id}</p>
                        <span className="text-xs text-muted-foreground">{invoice.date}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3 text-muted-foreground">
                        <span>{invoice.total}</span>
                        <span>{invoice.status}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ProfileLatestSeenProducts />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
