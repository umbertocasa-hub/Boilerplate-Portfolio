import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';
    const lowerUA = userAgent.toLowerCase();

    // List of blocked User-Agents (Tools/Bots)
    const blockedAgents = [
        'postman',
        'insomnia',
        'curl',
        'wget',
        'python-requests',
        'axios',
        'thunder client',
        'httpie',
        'go-http-client'
    ];

    // Check if UA matches any blocked agent
    const isBlocked = blockedAgents.some(agent => lowerUA.includes(agent));

    if (isBlocked && !request.nextUrl.pathname.startsWith('/nice-try')) {
        // Redirect to Trap Page
        return NextResponse.rewrite(new URL('/nice-try', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
