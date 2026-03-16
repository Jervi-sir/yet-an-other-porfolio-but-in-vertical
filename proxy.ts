import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const authCookie = req.cookies.get('admin-auth');
  
  // If the user is trying to access the login page while already authenticated, redirect to /admin
  if (req.nextUrl.pathname === '/login' && authCookie?.value === 'true') {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  // If the user is trying to access an /admin route and is not authenticated, redirect to /login
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
