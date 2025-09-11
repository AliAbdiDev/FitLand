// app/api/user/route.js
import { prisma } from '@/app/api/lib';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractSafeParseErrors } from '@/app/api/lib';
import { password } from '@/app/shemas';

const userSchema = z.object({
  name: z
    .string()
    .min(1, 'username must be at least one character')
    .max(55, 'Username must be at maximum fifty-five character'),
  email: z.string().email('Your email is not correct'),
  password: password,
});


export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ message: 'اتصال موفق', data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'خطا در اتصال', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationData = userSchema.safeParse(body);

    // اول چک کن که اعتبارسنجی موفق بوده یا نه
    if (!validationData.success) {
      return NextResponse.json(
        {
          error: "Invalid input",
          details: extractSafeParseErrors(validationData),
        },
        { status: 400 }
      );
    }

    // اگه اعتبارسنجی موفق بود، داده رو بگیریم
    const { name, email, password } = validationData.data;

    // ساخت کاربر جدید
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    // خطای یونیک بودن ایمیل
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    // خطای عمومی
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}