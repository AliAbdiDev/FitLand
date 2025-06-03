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
        // Attempt to parse the request body as JSON
        let body = null;
        try {
            body = await request.json();
        } catch {
            return createErrorResponse({
                message: 'Invalid or missing JSON in request body',
                status: 400,
            });
        }
        console.log("🚀 ~ POST ~ body:", body);

        // Validate the parsed body against the schema
        const result = loginShema.safeParse(body);
        if (!result.success) {
            return createErrorResponse({
                message: 'Invalid input',
                details: extractSafeParseErrors(result),
                status: 400,
            });
        }

        // Extract email and password from validated data
        const { email, password } = result.data;

        console.log("🚀 ~ POST ~ user:", result.data)
        // Find the user in the database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return createErrorResponse({
                message: 'Email is wrong',
                status: 401,
            });
        }

        // Verify the password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return createErrorResponse({
                message: 'Password is wrong',
                status: 401,
            });
        }

        // Generate token
        const token = generateToken(user.id);
        if (!token) {
            return createErrorResponse({
                message: 'Failed to generate token',
                status: 500,
            });
        }

        // Update user with token
        await prisma.user.update({
            where: { id: user.id },
            data: { token },
        });

        // Return a successful response
        return NextResponse.json(
            { token, id: user.id, email: user.email },
            { status: 201 }
        );
    } catch (error) {
        console.error('🚀 ~ POST ~ error:', error);
        return createErrorResponse({
            message: 'Internal server error',
            status: 500,
        });
    }
}