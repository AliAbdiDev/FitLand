import { prisma, createErrorResponse, hashPassword } from '@/app/api/lib';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractSafeParseErrors } from '@/app/api/lib';
import { password } from '@/app/shemas';

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
                message: 'Invalid or missing JSON in request body',
                status: 400,
            });
        }

        const result = resetPasswordSchema.safeParse(body);
        if (!result.success) {
            return createErrorResponse({
                message: 'Invalid input',
                details: extractSafeParseErrors(result),
                status: 400,
            });
        }

        const { token, password } = result.data;

        const resetToken = await prisma.resetToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return createErrorResponse({
                message: 'Invalid or expired token',
                status: 400,
            });
        }

        const hashedPassword = await hashPassword(password);
        await prisma.user.update({
            where: { id: resetToken.userId },
            data: { password: hashedPassword },
        });

        await prisma.resetToken.delete({ where: { id: resetToken.id } });

        return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });
    } catch (error) {
        console.error('🚀 ~ POST ~ error:', error);
        return createErrorResponse({
            message: 'Internal server error',
            status: 500,
        });
    }
}