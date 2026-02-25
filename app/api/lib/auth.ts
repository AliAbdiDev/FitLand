import { cookies } from "next/headers";
import {
  createHash,
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import {
  AUTH_USER_COOKIE_NAME,
  type MockAuthUserCookie,
  encodeMockAuthUserCookie,
} from "@/lib/mock-auth-session";

const MOCK_AUTH_SECRET =
  process.env.MOCK_AUTH_SECRET || "fitland-mock-auth-secret";

export const AUTH_COOKIE_NAME = "access-token";

const ACCESS_TOKEN_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const RESET_TOKEN_MAX_AGE_SECONDS = 60 * 60;

type MockTokenType = "access" | "reset";

type MockTokenPayload = {
  type: MockTokenType;
  sub: string;
  iat: number;
  exp: number;
  email?: string;
  name?: string;
  role?: string;
};

type CreateMockAccessTokenInput = {
  email: string;
  name?: string;
  role?: string;
  sub?: string;
};

type CreateMockResetTokenInput = {
  email: string;
  sub?: string;
  expiresInSeconds?: number;
};

const toBase64Url = (value: string) =>
  Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + padding, "base64").toString("utf8");
};

const sign = (input: string) =>
  createHmac("sha256", MOCK_AUTH_SECRET)
    .update(input)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const isSignatureValid = (value: string, expected: string) => {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
};

const createToken = (
  type: MockTokenType,
  payload: Omit<MockTokenPayload, "type" | "iat" | "exp">,
  maxAgeSeconds: number
) => {
  const now = Math.floor(Date.now() / 1000);
  const tokenPayload: MockTokenPayload = {
    ...payload,
    type,
    iat: now,
    exp: now + maxAgeSeconds,
  };

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(tokenPayload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = sign(unsignedToken);

  return {
    token: `${unsignedToken}.${signature}`,
    payload: tokenPayload,
  };
};

const verifyToken = (token: string, expectedType: MockTokenType) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = sign(unsignedToken);

  if (!isSignatureValid(signature, expectedSignature)) {
    return null;
  }

  try {
    const parsed = JSON.parse(fromBase64Url(encodedPayload)) as MockTokenPayload;
    const now = Math.floor(Date.now() / 1000);

    if (parsed.type !== expectedType) {
      return null;
    }

    if (!parsed.exp || parsed.exp <= now) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const createMockUserId = (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();
  const digest = createHash("sha256").update(normalizedEmail).digest("hex");
  return `mock_${digest.slice(0, 16)}`;
};

export const createMockAccessToken = ({
  email,
  name,
  role = "user",
  sub,
}: CreateMockAccessTokenInput) => {
  const normalizedEmail = email.trim().toLowerCase();
  return createToken(
    "access",
    {
      sub: sub || createMockUserId(normalizedEmail),
      email: normalizedEmail,
      name: name || "",
      role,
    },
    ACCESS_TOKEN_MAX_AGE_SECONDS
  ).token;
};

export const createMockResetToken = ({
  email,
  sub,
  expiresInSeconds = RESET_TOKEN_MAX_AGE_SECONDS,
}: CreateMockResetTokenInput) => {
  const normalizedEmail = email.trim().toLowerCase();
  const { token, payload } = createToken(
    "reset",
    {
      sub: sub || createMockUserId(normalizedEmail),
      email: normalizedEmail,
    },
    expiresInSeconds
  );

  return {
    token,
    expiresAt: new Date(payload.exp * 1000).toISOString(),
    exp: payload.exp,
  };
};

export const verifyMockResetToken = (token: string) => verifyToken(token, "reset");

export const getAuthCookieValue = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
};

export const setAuthCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
};

export const setAuthUserCookie = async (user: MockAuthUserCookie) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_USER_COOKIE_NAME, encodeMockAuthUserCookie(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE_SECONDS,
  });
};

export const clearAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
};

export const clearAuthUserCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_USER_COOKIE_NAME);
};
