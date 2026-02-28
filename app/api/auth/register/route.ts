import { createErrorResponse, extractSafeParseErrors } from "@/app/api/lib";
import { email, password } from "@/app/shemas";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const registerSchema = z.object({
  email,
  password,
  name: z.string().min(1, "Name is required").optional(),
  username: z.string().min(1, "Name is required").optional(),
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

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return createErrorResponse({
        message: "Invalid input",
        details: extractSafeParseErrors(result),
        status: 400,
      });
    }

    const normalizedName = result.data.name || result.data.username || "";
    void normalizedName;

    return NextResponse.json(
      { message: "Registration was successful" },
      { status: 201 }
    );
  } catch (error) {
    return createErrorResponse({
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
