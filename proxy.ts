import { decodeMockAuthUserCookie, AUTH_USER_COOKIE_NAME } from "@/lib/mock-auth-session";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("access-token")?.value;
  const authUserCookie = request.cookies.get(AUTH_USER_COOKIE_NAME)?.value;
  const authUser = decodeMockAuthUserCookie(authUserCookie);

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isLoggedIn = Boolean(accessToken && authUser);

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};

