"use client";

import * as React from "react";
import { FileText, History, LogOut, PencilLine } from "lucide-react";
import type { MockAuthUserCookie } from "@/lib/mock-auth-session";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import {
  AvatarImageUploader,
  type ImageUploaderValue,
} from "@/components/ui/image-uploader";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  {
    id: "latest",
    label: "محصولات اخیر",
    icon: <History className="size-4" />,
  },
  {
    id: "edit",
    label: "ویرایش پروفایل",
    icon: <PencilLine className="size-4" />,
  },
  {
    id: "invoices",
    label: "فاکتورهای فروش",
    icon: <FileText className="size-4" />,
  },
];

const PROFILE_ACTIVE_SECTION_STORAGE_KEY = "profile_active_section_id";

function isProfileSection(value: string | null): value is ProfileSection {
  return value === "latest" || value === "edit" || value === "invoices";
}

function buildUserDisplayName(authUser: MockAuthUserCookie) {
  const firstName = authUser.name?.trim() || "";
  const family = authUser.family?.trim() || "";
  return [firstName, family].filter(Boolean).join(" ") || authUser.email;
}

function SaveProfileButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="rounded-lg px-6" disabled={pending}>
      {pending ? "در حال ذخیره..." : "ذخیره تغییرات"}
    </Button>
  );
}

function LogoutConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      className="rounded-lg"
      disabled={pending}
    >
      <LogOut className="size-4" />
      {pending ? "در حال خروج..." : "بله، خارج می‌شوم"}
    </Button>
  );
}

function ProfileMenuButton({
  active,
  item,
  onClick,
}: {
  active: boolean;
  item: MenuItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-right transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        active
          ? "border-primary/10 bg-amber-50 text-foreground  shadow-sm"
          : "border-border bg-background text-foreground hover:border-primary/20 hover:bg-primary/5",
      )}
      aria-pressed={active}
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        <span className={"text-foreground"}>{item.icon}</span>
        {item.label}
      </span>
    </button>
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
  const [activeSection, setActiveSection] =
    React.useState<ProfileSection>("latest");
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const [profileImageUpload, setProfileImageUpload] =
    React.useState<ImageUploaderValue | null>(null);
  const [hasRestoredSection, setHasRestoredSection] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (profileSaved && initialSection === "edit") {
      setActiveSection("edit");
      setHasRestoredSection(true);
      return;
    }

    const storedSection = window.localStorage.getItem(
      PROFILE_ACTIVE_SECTION_STORAGE_KEY,
    );

    if (isProfileSection(storedSection)) {
      setActiveSection(storedSection);
      setHasRestoredSection(true);
      return;
    }

    setActiveSection(initialSection || "latest");
    setHasRestoredSection(true);
  }, [initialSection, profileSaved]);

  React.useEffect(() => {
    if (typeof window === "undefined" || !hasRestoredSection) {
      return;
    }

    window.localStorage.setItem(PROFILE_ACTIVE_SECTION_STORAGE_KEY, activeSection);
  }, [activeSection, hasRestoredSection]);

  const userLabel = buildUserDisplayName(authUser);
  const userInitial = (userLabel || "ک").trim().charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border via-background to-secondary/10 shadow-sm">
        <CardContent className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 border border-primary/20 ring-4 ring-primary/10">
              <AvatarImage
                src={authUser.imageUrl || undefined}
                alt={userLabel}
              />
              <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                {userInitial}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-lg font-bold text-foreground">
                پروفایل کاربر
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                {userLabel}
              </p>
              <p className="text-xs text-muted-foreground">{authUser.email}</p>
            </div>
          </div>

          <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                variant="destructive"
                className="w-fit"
              >
                <LogOut className="size-4" />
              <span className="text-xs">خروج</span>
              </Button>
            </DialogTrigger>

            <DialogContent dir="rtl" className="sm:max-w-md">
              <DialogHeader className="text-right sm:text-right">
                <DialogTitle>تأیید خروج از حساب</DialogTitle>
                <DialogDescription>
                  آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="gap-2 sm:flex-row sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                  >
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
              <CardDescription>
                برای مشاهده هر بخش روی آیتم موردنظر کلیک کنید.
              </CardDescription>
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
         
        </div>

        <div className="space-y-6">
          {activeSection === "latest" ? <ProfileLatestSeenProducts /> : null}

          {activeSection === "edit" ? (
            <Card className="rounded-2xl border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  ویرایش اطلاعات پروفایل
                </CardTitle>
                <CardDescription>
                  اطلاعات شخصی، تصویر پروفایل و آدرس خود را به‌روزرسانی کنید.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {profileSaved ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                    اطلاعات پروفایل با موفقیت ذخیره شد.
                  </div>
                ) : null}

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-14 border border-primary/20">
                        <AvatarImage
                          src={authUser.imageUrl || undefined}
                          alt={userLabel}
                        />
                        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">
                          {userLabel}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          نقش کاربر: {authUser.role || "user"}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      تصویر پروفایل را بارگذاری و در پنجره برش، ناحیه دلخواه را
                      انتخاب کنید.
                    </p>
                  </div>
                </div>

                <form action={saveProfileAction} className="space-y-5">
                  <input
                    type="hidden"
                    name="imageUrl"
                    value={profileImageUpload ? "" : authUser.imageUrl || ""}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="imageDataUrl"
                    value={profileImageUpload?.previewUrl || ""}
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="imageFileName"
                    value={profileImageUpload?.file.name || ""}
                    readOnly
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">نام</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        defaultValue={authUser.name || ""}
                        placeholder="مثال: علی"
                        autoComplete="given-name"
                        className="rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="family">نام خانوادگی</Label>
                      <Input
                        id="family"
                        name="family"
                        defaultValue={authUser.family || ""}
                        placeholder="مثال: رضایی"
                        autoComplete="family-name"
                        className="rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">ایمیل</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        dir="ltr"
                        defaultValue={authUser.email}
                        placeholder="example@mail.com"
                        autoComplete="email"
                        className="rounded-lg text-left"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">شماره موبایل</Label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        dir="ltr"
                        defaultValue={authUser.phoneNumber || ""}
                        placeholder="09123456789"
                        autoComplete="tel"
                        className="rounded-lg text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <AvatarImageUploader
                      id="profile-image-upload"
                      label="تصویر پروفایل"
                      fallbackPreviewUrl={authUser.imageUrl || ""}
                      avatarFallbackText={userInitial}
                      maxUploadSizeBytes={5 * 1024 * 1024}
                      maxCroppedImageSizeBytes={512 * 1024}
                      acceptedImageTypes={[
                        "image/png",
                        "image/jpeg",
                        "image/webp",
                      ]}
                      onValueChange={setProfileImageUpload}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">آدرس (متن فارسی)</Label>
                    <Textarea
                      id="address"
                      name="address"
                      rows={4}
                      defaultValue={authUser.address || ""}
                      placeholder="مثال: تهران، خیابان ولیعصر، پلاک ۱۲، واحد ۳"
                      className="rounded-lg leading-7"
                    />
                  </div>

                  <div className="flex justify-end">
                    <SaveProfileButton />
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : null}

          {activeSection === "invoices" ? (
            <Card className="rounded-2xl border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">فاکتورهای فروش</CardTitle>
                <CardDescription>
                  لیست سفارش‌ها و وضعیت پرداخت شما در این بخش نمایش داده می‌شود.
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
                        <p className="font-semibold text-foreground">
                          {invoice.id}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {invoice.date}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="font-medium text-primary">
                          {invoice.total}
                        </span>
                        <span className="text-muted-foreground">
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
