import { NextResponse } from 'next/server';

const supportedLocales = ['ru', 'en', 'uz', 'tr'];
const defaultLocale = 'ru';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0]?.toLowerCase();

  if (supportedLocales.includes(firstSegment)) {
    return NextResponse.next();
  }

  const newPath = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(new URL(newPath, request.url));
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon|opengraph-image|images|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|mp4)).*)',
  ],
};
