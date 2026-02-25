import {
  createErrorResponse,
  extractSafeParseErrors,
  verifyMockResetToken,
} from "@/app/api/lib";
import { password } from "@/app/shemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const resetPasswordSchema = z.object({
  token: z.string(),
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

    const result = resetPasswordSchema.safeParse(body);
    if (!result.success) {
      return createErrorResponse({
        message: "Invalid input",
        details: extractSafeParseErrors(result),
        status: 400,
      });
    }

    const verifiedToken = verifyMockResetToken(result.data.token);
    if (!verifiedToken) {
      return createErrorResponse({
        message: "Invalid or expired token",
        status: 400,
      });
    }

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });
  } catch {
    return createErrorResponse({
      message: "Internal server error",
      status: 500,
    });
  }
}
