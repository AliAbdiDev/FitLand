import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Layout from "@/components/layout/Layout";
import ProfileDashboardClient, {
  type ProfileSection,
} from "@/components/profile/ProfileDashboardClient";
import {
  AUTH_COOKIE_NAME,
  clearAuthCookie,
  clearAuthUserCookie,
  createMockAccessToken,
  setAuthCookie,
  setAuthUserCookie,
} from "@/app/api/lib/auth";
import { AUTH_USER_COOKIE_NAME, decodeMockAuthUserCookie } from "@/lib/mock-auth-session";
import type { SearchParams } from "@/types/next";

const mockInvoices = [
  { id: "INV-1404-001", date: "۱۴۰۴/۱۲/۰۱", total: "۱,۳۵۰,۰۰۰ تومان", status: "پرداخت شده" },
  { id: "INV-1404-002", date: "۱۴۰۴/۱۱/۲۳", total: "۸۹۰,۰۰۰ تومان", status: "ارسال شده" },
  { id: "INV-1404-003", date: "۱۴۰۴/۱۰/۳۰", total: "۴۲۰,۰۰۰ تومان", status: "تکمیل شده" },
];

function getFirstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSection(value: string | undefined): ProfileSection {
  if (value === "edit" || value === "invoices" || value === "latest") {
    return value;
  }

  return "latest";
}

function getFormString(formData: FormData, key: string, maxLength = 500) {
  const value = formData.get(key);
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized.slice(0, maxLength);
}

function normalizeImageUrl(value: string) {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

function sanitizeFileName(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getImageExtensionFromMimeType(mimeType: string) {
  if (mimeType === "image/jpeg") {
    return "jpg";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  return "png";
}

async function persistProfileImageDataUrl({
  imageDataUrl,
  imageFileName,
  userId,
}: {
  imageDataUrl: string;
  imageFileName: string;
  userId: string;
}) {
  if (!imageDataUrl.startsWith("data:image/")) {
    return "";
  }

  const match = imageDataUrl.match(/^data:(image\/(?:png|jpeg|webp));base64,(.+)$/);

  if (!match) {
    return "";
  }

  const [, mimeType, base64Data] = match;

  if (!base64Data) {
    return "";
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "profile");
  await mkdir(uploadDir, { recursive: true });

  const baseName =
    sanitizeFileName(imageFileName.replace(/\.[^.]+$/, "")) || `user-${userId}`;
  const fileName = `${baseName}-${Date.now()}.${getImageExtensionFromMimeType(mimeType)}`;
  const outputPath = path.join(uploadDir, fileName);

  await writeFile(outputPath, Buffer.from(base64Data, "base64"));

  return `/uploads/profile/${fileName}`;
}

export default async function ProfilePage({ searchParams }: { searchParams: SearchParams }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  const authUserCookie = cookieStore.get(AUTH_USER_COOKIE_NAME)?.value;
  const authUser = decodeMockAuthUserCookie(authUserCookie);
  const rawSearch = await searchParams;
  const initialSection = normalizeSection(getFirstValue(rawSearch?.section));
  const profileSaved = getFirstValue(rawSearch?.saved) === "1";

  if (!accessToken || !authUser) {
    redirect("/login");
  }

  async function logoutAction() {
    "use server";

    await clearAuthCookie();
    await clearAuthUserCookie();
    redirect("/");
  }

  async function saveProfileAction(formData: FormData) {
    "use server";

    const cookieStore = await cookies();
    const currentAccessToken = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    const currentAuthUserCookie = cookieStore.get(AUTH_USER_COOKIE_NAME)?.value;
    const currentAuthUser = decodeMockAuthUserCookie(currentAuthUserCookie);

    if (!currentAccessToken || !currentAuthUser) {
      redirect("/login");
    }

    const firstName = getFormString(formData, "firstName", 80);
    const family = getFormString(formData, "family", 120);
    const email = getFormString(formData, "email", 180).toLowerCase() || currentAuthUser.email;
    const phoneNumber = getFormString(formData, "phoneNumber", 32);
    const address = getFormString(formData, "address", 500);
    const imageUrlInput = getFormString(formData, "imageUrl", 500);
    const imageDataUrl = getFormString(formData, "imageDataUrl", 1_500_000);
    const imageFileName = getFormString(formData, "imageFileName", 200);

    let imageUrl = normalizeImageUrl(imageUrlInput);

    if (imageDataUrl) {
      const uploadedImagePath = await persistProfileImageDataUrl({
        imageDataUrl,
        imageFileName,
        userId: currentAuthUser.id,
      });

      if (uploadedImagePath) {
        imageUrl = uploadedImagePath;
      }
    }

    const tokenDisplayName =
      [firstName, family].filter(Boolean).join(" ") ||
      [currentAuthUser.name, currentAuthUser.family].filter(Boolean).join(" ") ||
      "";

    await setAuthCookie(
      createMockAccessToken({
        email,
        name: tokenDisplayName,
        role: currentAuthUser.role,
        sub: currentAuthUser.id,
      })
    );

    await setAuthUserCookie({
      ...currentAuthUser,
      email,
      name: firstName,
      family,
      phoneNumber,
      address,
      imageUrl,
    });

    redirect("/profile?section=edit&saved=1");
  }

  return (
    <Layout>
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProfileDashboardClient
          authUser={authUser}
          invoices={mockInvoices}
          initialSection={initialSection}
          profileSaved={profileSaved}
          saveProfileAction={saveProfileAction}
          logoutAction={logoutAction}
        />
      </main>
    </Layout>
  );
}
