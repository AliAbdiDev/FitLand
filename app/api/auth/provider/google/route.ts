import { createErrorResponse, generateToken, prisma } from '@/app/api/lib';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { extractSafeParseErrors } from '@/app/api/lib';
import { email } from '@/app/shemas';

const googleLoginSchema = z.object({
    email: email,
    name: z.string().optional(),
    avatar: z.string().url().optional(),
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

        // Validate the parsed body against the schema
        const result = googleLoginSchema.safeParse(body);
        if (!result.success) {
            return createErrorResponse({
                message: 'Invalid input',
                details: extractSafeParseErrors(result),
                status: 400,
            });
        }

        // Extract email, name, and avatar from validated data
        const { email, name, avatar } = result.data;

        // Find or create the user in the database
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Register new user
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || null,
                    password: '',
                    role: 'user',
                    profile: {
                        create: {
                            avatar: avatar || null,
                        },
                    },
                },
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
            {
                token,
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                profile: user.profileId
                    ? await prisma.profile.findUnique({
                        where: { userId: user.id },
                        select: { avatar: true, fatherName: true, phoneNumber: true, gender: true, birthDate: true, },
                    })
                    : null,
            },
            { status: user.profileId ? 200 : 201 }
        );
    } catch (error) {
        console.error('🚀 ~ POST ~ error:', error);
        return createErrorResponse({
            message: 'Internal server error',
            status: 500,
        });
    }
}