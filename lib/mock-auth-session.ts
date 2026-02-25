export const AUTH_USER_COOKIE_NAME = "auth-user";

export type MockAuthUserCookie = {
  id: string;
  email: string;
  name?: string;
  family?: string;
  phoneNumber?: string;
  address?: string;
  imageUrl?: string;
  role?: string;
};

const toBase64Url = (value: string) =>
  Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding =
    normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
};

export const encodeMockAuthUserCookie = (user: MockAuthUserCookie) =>
  toBase64Url(JSON.stringify(user));

export const decodeMockAuthUserCookie = (value?: string | null) => {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(value)) as Partial<MockAuthUserCookie>;
    if (!parsed?.id || !parsed?.email) {
      return null;
    }

    const safeValue = (input: unknown) => (typeof input === "string" ? input : "");

    return {
      id: parsed.id,
      email: parsed.email,
      name: safeValue(parsed.name),
      family: safeValue(parsed.family),
      phoneNumber: safeValue(parsed.phoneNumber),
      address: safeValue(parsed.address),
      imageUrl: safeValue(parsed.imageUrl),
      role: safeValue(parsed.role) || "user",
    } satisfies MockAuthUserCookie;
  } catch {
    return null;
  }
};
