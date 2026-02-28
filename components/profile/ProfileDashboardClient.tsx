"use client";

import * as React from "react";
import { FileText, History, LogOut, PencilLine } from "lucide-react";
import type { MockAuthUserCookie } from "@/lib/mock-auth-session";
import ProfileLatestSeenProducts from "@/components/profile/ProfileLatestSeenProducts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileMenuButton } from "./ProfileMenuButton";
import { ProfileEditForm } from "./ProfileEditForm";
import { useLastAddressStore } from "@/stores/last-address-store";
import { useProfileImageStore } from "@/stores/profile-image-store";
import { useFormStatus } from "react-dom";

export type ProfileSection = "latest" | "edit" | "invoices";

type ProfileInvoiceItem = {
  id: string;
  date: string;
  total: string;
  status: string;
};

type ProfileDashboardClientProps = {
  authUser: MockAuthUserCookie;
  invoices: ProfileInvoiceItem[];
  initialSection: ProfileSection;
  profileSaved?: boolean;
  saveProfileAction: (formData: FormData) => Promise<void>;
  logoutAction: () => Promise<void>;
};

type MenuItem = {
  id: ProfileSection;
  label: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  { id: "latest", label: "محصولات اخیر", icon: <History className="size-4" /> },
  { id: "edit", label: "ویرایش پروفایل", icon: <PencilLine className="size-4" /> },
  { id: "invoices", label: "فاکتورهای فروش", icon: <FileText className="size-4" /> },
];

function buildUserDisplayName(authUser: MockAuthUserCookie) {
  const firstName = authUser.name?.trim() || "";
  const family = authUser.family?.trim() || "";
  return [firstName, family].filter(Boolean).join(" ") || authUser.email;
}

function LogoutConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" className="rounded-lg" disabled={pending}>
      <LogOut className="size-4" />
      {pending ? "در حال خروج..." : "بله، خارج میشوم"}
    </Button>
  );
}

export default function ProfileDashboardClient({
  authUser,
  invoices,
  initialSection,
  profileSaved = false,
  saveProfileAction,
  logoutAction,
}: ProfileDashboardClientProps) {
  const [activeSection, setActiveSection] = React.useState<ProfileSection>("latest");
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const { lastAddress } = useLastAddressStore();
  const { imageDataUrl } = useProfileImageStore();

  React.useEffect(() => {
    if (profileSaved && initialSection === "edit") {
      setActiveSection("edit");
      return;
    }
    setActiveSection(initialSection || "latest");
  }, [initialSection, profileSaved]);

  const userLabel = buildUserDisplayName(authUser);
  const userInitial = (userLabel || "ک").trim().charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border via-background to-secondary/10 shadow-sm">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 border border-primary/20 ring-4 ring-primary/10">
              <AvatarImage src={imageDataUrl || authUser.imageUrl || undefined} alt={userLabel} />
              <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-lg font-bold text-foreground">پروفایل کاربر</h1>
              <p className="text-sm font-medium text-muted-foreground">{userLabel}</p>
              {authUser.name && <p className="text-xs text-muted-foreground">{authUser.email}</p>}
            </div>
          </div>

          <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="destructive" className="w-fit">
                <LogOut className="size-4" />
                <span className="text-xs">خروج</span>
              </Button>
            </DialogTrigger>

            <DialogContent dir="rtl" className="sm:max-w-md">
              <DialogHeader className="text-right sm:text-right">
                <DialogTitle>تأیید خروج از حساب</DialogTitle>
                <DialogDescription>
                  آیا مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید؟
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="gap-2 sm:flex-row sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="rounded-lg">
                    انصراف
                  </Button>
                </DialogClose>

                <form action={logoutAction}>
                  <LogoutConfirmButton />
                </form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="space-y-6">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">منوی پروفایل</CardTitle>
              <CardDescription>برای مشاهده هر بخش روی آیتم موردنظر کلیک کنید.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {menuItems.map((item) => (
                <ProfileMenuButton
                  key={item.id}
                  item={item}
                  active={activeSection === item.id}
                  onClick={() => setActiveSection(item.id)}
                />
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">آخرین آدرس ثبت شده</CardTitle>
            </CardHeader>
            <CardContent>
              {lastAddress && (lastAddress.provinceName || lastAddress.cityName || lastAddress.address) ? (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lastAddress.provinceName}
                  {lastAddress.provinceName && lastAddress.cityName && "، "}
                  {lastAddress.cityName}
                  {(lastAddress.provinceName || lastAddress.cityName) && lastAddress.address && " و "}
                  {lastAddress.address}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">هنوز آدرسی ثبت نشده است.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {activeSection === "latest" && <ProfileLatestSeenProducts />}

          {activeSection === "edit" && (
            <Card className="rounded-2xl border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">ویرایش اطلاعات پروفایل</CardTitle>
                <CardDescription>
                  اطلاعات شخصی، تصویر پروفایل و آدرس خود را بهروزرسانی کنید.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <ProfileEditForm
                  authUser={authUser}
                  userInitial={userInitial}
                  saveProfileAction={saveProfileAction}
                />
              </CardContent>
            </Card>
          )}

          {activeSection === "invoices" && (
            <Card className="rounded-2xl border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">فاکتورهای فروش</CardTitle>
                <CardDescription>
                  لیست سفارشها و وضعیت پرداخت شما در این بخش نمایش داده میشود.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {invoices.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
                    هنوز فاکتوری برای این حساب ثبت نشده است.
                  </div>
                ) : (
                  invoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="rounded-xl border border-border px-4 py-3 text-sm transition hover:border-primary/20 hover:bg-primary/5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-foreground">{invoice.id}</p>
                        <span className="text-xs text-muted-foreground">{invoice.date}</span>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="font-medium text-primary">{invoice.total}</span>
                        <span className="text-muted-foreground">{invoice.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
