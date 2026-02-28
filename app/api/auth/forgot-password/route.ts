import {
  createErrorResponse,
  createMockResetToken,
  extractSafeParseErrors,
} from "@/app/api/lib";
import { email } from "@/app/shemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const forgotPasswordSchema = z.object({
  email,
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

    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return createErrorResponse({
        message: "Invalid input",
        details: extractSafeParseErrors(result),
        status: 400,
      });
    }

    const { token: resetToken, expiresAt } = createMockResetToken({
      email: result.data.email,
    });
    const resetLink = `${request.nextUrl.origin}/reset-password?token=${encodeURIComponent(resetToken)}`;

    return NextResponse.json(
      {
        message: "If the email exists, a reset link has been sent.",
        resetToken,
        resetLink,
        expiresAt,
      },
      { status: 200 }
    );
  } catch {
    return createErrorResponse({
      message: "Internal server error",
      status: 500,
    });
  }
}
