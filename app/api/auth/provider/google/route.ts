import {
  createErrorResponse,
  createMockAccessToken,
  createMockUserId,
  extractSafeParseErrors,
  setAuthCookie,
  setAuthUserCookie,
} from "@/app/api/lib";
import { email } from "@/app/shemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const googleLoginSchema = z.object({
  email: email.optional(),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    let body: unknown = {};
    try {
      body = await request.json();
    } catch {
      const contentLength = request.headers.get("content-length");
      if (!contentLength || contentLength === "0") {
        body = {};
      } else {
        return createErrorResponse({
          message: "Invalid or missing JSON in request body",
          status: 400,
        });
      }
    }

    const result = googleLoginSchema.safeParse(body);
    if (!result.success) {
      return createErrorResponse({
        message: "Invalid input",
        details: extractSafeParseErrors(result),
        status: 400,
      });
    }

    const emailValue = (result.data.email || "mock-google-user@example.com")
      .trim()
      .toLowerCase();
    const name = result.data.name || "Mock Google User";
    const avatar = result.data.avatar || null;
    const id = createMockUserId(emailValue);
    const token = createMockAccessToken({
      email: emailValue,
      name,
      role: "user",
      sub: id,
    });

    await setAuthCookie(token);
    await setAuthUserCookie({
      id,
      email: emailValue,
      name,
      role: "user",
    });

    return NextResponse.json(
      {
        token,
        id,
        email: emailValue,
        name,
        role: "user",
        profile: {
          fullName: name,
          avatar,
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch {
    return createErrorResponse({
      message: "Internal server error",
      status: 500,
    });
  }
}
