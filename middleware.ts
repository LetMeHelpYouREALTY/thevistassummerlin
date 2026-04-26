import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname, search } = request.nextUrl;

  // Filtered search URLs create many thin variants; keep base /search indexable
  // while asking crawlers not to index parameterized versions.
  if (pathname === '/search' && search) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 