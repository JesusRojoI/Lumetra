// src/app/layout.tsx
import type { Metadata } from 'next';
import { Bentham, Unna } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';
import { Providers } from './providers';

const bentham = Bentham({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bentham',
  display: 'swap',
});

const unna = Unna({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-unna',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMETRA | Agencia de Marketing Digital',
  description:
    'Creamos publicidad que se siente, no solo se ve. Fusionamos estrategia y creatividad para construir identidades visuales únicas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieLocale = cookies().get('NEXT_LOCALE')?.value;
  const lang = cookieLocale === 'en' ? 'en' : 'es';

  return (
    <html lang={lang} className={`${bentham.variable} ${unna.variable}`}>
      <body className="font-bentham antialiased">
        <Providers initialLocale={lang}>{children}</Providers>
      </body>
    </html>
  );
}