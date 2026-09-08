import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Establecer el locale en los headers
  response.headers.set('x-next-intl-locale', 'es');
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};