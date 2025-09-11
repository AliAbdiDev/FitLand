import { prisma, createErrorResponse } from '@/app/api/lib';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractSafeParseErrors } from '@/app/api/lib';
import { email } from '@/app/shemas';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

const forgotPasswordSchema = z.object({
  email,
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    let body = null;
    try {
      body = await request.json();
    } catch {
      return createErrorResponse({
        message: 'Invalid or missing JSON in request body',
        status: 400,
      });
    }
    console.log('🚀 ~ POST ~ body:', body);

    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return createErrorResponse({
        message: 'Invalid input',
        details: extractSafeParseErrors(result),
        status: 400,
      });
    }

    const { email } = result.data;

    const user = await prisma.user.findUnique({ where: { email: email as string } });
    if (!user) {
      return NextResponse.json(
        { message: 'If the email exists, a reset link has been sent.' },
        { status: 200 }
      );
    }

    const resetToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);// 1 hour

    await prisma.resetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expiresAt,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password',
      html: `
        <p>Dear ${user.name || 'User'},</p>
        <p>You requested to reset your password. Click the link below to set a new password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    });

    return NextResponse.json(
      { message: 'If the email exists, a reset link has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('🚀 ~ POST ~ error:', error);
    return createErrorResponse({
      message: 'Internal server error',
      status: 500,
    });
  }
}