import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Routes as RouteEnum } from '@/core/enum';

const protectedRoutes = [String(RouteEnum.General), String(RouteEnum.Blog)];
const authRoutes = [String(RouteEnum.Login)];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    const isAuthRoute = authRoutes.includes(pathname);
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    if (!token && isProtectedRoute) {
        if (pathname === RouteEnum.Login) return NextResponse.next();
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = RouteEnum.Login;
        return NextResponse.redirect(loginUrl);
    }

    if (token && isAuthRoute) {
        const blogUrl = request.nextUrl.clone();
        blogUrl.pathname = RouteEnum.Blog;
        return NextResponse.redirect(blogUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/blog/:path*', '/login'],
};
