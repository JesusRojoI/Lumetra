// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['es', 'en'] as const;
const DEFAULT_LOCALE = 'es';
const COOKIE_NAME = 'NEXT_LOCALE';

export function middleware(request: NextRequest) {
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  const locale = LOCALES.includes(cookieLocale as any)
    ? (cookieLocale as string)
    : DEFAULT_LOCALE;

  // Pasa el locale al servidor para que i18n.ts lo lea
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-intl-locale', locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // También lo expone en la respuesta (útil para debug)
  response.headers.set('x-next-intl-locale', locale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};