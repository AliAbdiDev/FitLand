import { hashPassword, createErrorResponse, prisma } from '@/app/api/lib';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractSafeParseErrors } from '@/app/api/lib';
import { email, password } from '@/app/shemas';

const registerSchema = z.object({
    email,
    password,
    name: z.string().min(1, 'Name is required').optional(), 
});

export async function POST(request: NextRequest) {
    try {

        const body = await request.json()
        const result = registerSchema.safeParse(body);
        if (!result.success) {
            return createErrorResponse({
                message: 'Invalid input',
                details: extractSafeParseErrors(result),
                status: 400,
            });
        }
        const { email, name, password } = result?.data;
        const user = await prisma.user.findUnique({ where: { email } })
        if (user) {
            return createErrorResponse({
                message: 'Email is already registered',
                status: 409, // Conflict
            });
        }
        const hashedPassword = await hashPassword(password);
        await prisma.user.create({ data: { email, password: hashedPassword, name } });
        // NextResponse.redirect(new URL('/auth/login',request.url))
        return NextResponse.json({ message: 'Registration was successful' }, {status:201})
    } catch (error) {
        if (error) {
            return createErrorResponse({details:error?.message})
        }
    }
}