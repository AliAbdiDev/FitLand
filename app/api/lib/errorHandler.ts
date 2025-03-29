import { NextResponse } from 'next/server';
import { ErrorResponse } from '@/app/api/types';

export function createErrorResponse({
    status = 500,
    message = 'server internal error',
    details,
    code
}: ErrorResponse) {
    return NextResponse.json(
        {
            message,
            ...(details !== undefined ? { details } : {}),
            ...(code !== undefined ? { code } : {}),
        },
        { status }
    );
}
