import {
  clearAuthCookie,
  clearAuthUserCookie,
  createErrorResponse,
  getAuthCookieValue,
} from "@/app/api/lib";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    const token = await getAuthCookieValue();

    if (!token) {
      return createErrorResponse({
        message: "No token provided",
        status: 400,
      });
    }

    await clearAuthCookie();
    await clearAuthUserCookie();

    return NextResponse.json({ message: "Logged out successfully" }, { status: 201 });
  } catch (error) {
    return createErrorResponse({
      message: "Server error",
      details: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}
