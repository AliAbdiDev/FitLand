import {
  createErrorResponse,
  createMockAccessToken,
  createMockUserId,
  extractSafeParseErrors,
  setAuthCookie,
  setAuthUserCookie,
} from "@/app/api/lib";
import { email, password } from "@/app/shemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const loginShema = z.object({
  email,
  password,
});

export async function POST(request: NextRequest) {
  try {
    let body = null;
    try {
      body = await request.json();
    } catch {
      return createErrorResponse({
        message: "Invalid or missing JSON in request body",
        status: 400,
      });
    }

    const result = loginShema.safeParse(body);
    if (!result.success) {
      return createErrorResponse({
        message: "Invalid input",
        details: extractSafeParseErrors(result),
        status: 400,
      });
    }

    const normalizedEmail = result.data.email.trim().toLowerCase();
    const id = createMockUserId(normalizedEmail);
    const token = createMockAccessToken({ email: normalizedEmail, sub: id });

    await setAuthCookie(token);
    await setAuthUserCookie({
      id,
      email: normalizedEmail,
      role: "user",
      name: "",
    });

    return NextResponse.json({ token, id, email: normalizedEmail }, { status: 201 });
  } catch {
    return createErrorResponse({
      message: "Internal server error",
      status: 500,
    });
  }
}
