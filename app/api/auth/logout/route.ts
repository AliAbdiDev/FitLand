import { prisma, createErrorResponse } from '@/app/api/lib';
import { cookieHandler } from '@/utils';
import { NextResponse } from 'next/server';

export async function POST() {
    try {

        const { getValue, deleteCookie } = await cookieHandler({})
        const token = getValue()

        if (!token) {
            return createErrorResponse({
                message: 'No token provided',
                status: 400,
            });
        }

        const user = await prisma.user.findFirst({
            where: { token },
        });

        if (!user) {
            return createErrorResponse({
                message: 'Invalid token or user not found',
                status: 401,
            });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: { token: null },
        });
        // delet login-token
        deleteCookie()

        return NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Logout error:', error);
        return createErrorResponse({
            message: 'Server error',
            details: error?.message,
            status: 500,
        });
    }
}