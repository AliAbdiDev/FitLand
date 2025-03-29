import { comparePassword, createErrorResponse, generateToken, prisma } from '@/app/api/lib';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractSafeParseErrors } from '@/app/api/lib';
import { email, password } from '@/app/shemas';

const loginShema = z.object({
    email,
    password,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const result = loginShema.safeParse(body)

        if (!result.success) {
            return createErrorResponse({ message: 'invalid input', details: extractSafeParseErrors(result), status: 400 })

        }
        const { email, password } = result.data;

        //find user
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return createErrorResponse({ message: 'Email is wrong', status: 401 })
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return createErrorResponse({ message: 'password is wrong', status: 401 })
        }
        // success
        const token = generateToken(user?.id, user?.email);
        await prisma.user.update({
            where: { id: user.id },
            data: { token }, // save token
        });

        return NextResponse.json({ token, user: { id: user?.id, email: user?.email } }, { status: 201 })
    } catch (error) {
        if (error) {
            return createErrorResponse({})
        }
    }
}