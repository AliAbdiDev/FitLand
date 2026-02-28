import { extractSafeParseErrors } from "@/app/api/lib";
import { password } from "@/app/shemas";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { z } from "zod";

export const runtime = "nodejs";

const userSchema = z.object({
  name: z
    .string()
    .min(1, "username must be at least one character")
    .max(55, "Username must be at maximum fifty-five character"),
  email: z.string().email("Your email is not correct"),
  password,
});

const MOCK_USERS = [
  {
    id: "mock_user_1",
    name: "\u06A9\u0627\u0631\u0628\u0631 \u0646\u0645\u0648\u0646\u0647",
    email: "demo@example.com",
    password: "********",
  },
];

const createUserId = (email: string) =>
  `mock_${createHash("sha256").update(email.toLowerCase()).digest("hex").slice(0, 12)}`;

export async function GET() {
  try {
    return NextResponse.json(
      {
        message: "\u0627\u062A\u0635\u0627\u0644 \u0645\u0648\u0641\u0642",
        data: MOCK_USERS,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "\u062E\u0637\u0627 \u062F\u0631 \u0627\u062A\u0635\u0627\u0644",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationData = userSchema.safeParse(body);

    if (!validationData.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: extractSafeParseErrors(validationData),
        },
        { status: 400 }
      );
    }

    const { name, email } = validationData.data;
    const duplicateUser = MOCK_USERS.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (duplicateUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const newUser = {
      id: createUserId(email),
      name,
      email,
      password: "********",
    };

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
