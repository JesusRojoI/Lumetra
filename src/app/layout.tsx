import type { Metadata } from 'next'
import { Bentham, Unna } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const bentham = Bentham({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bentham',
  display: 'swap',
})

const unna = Unna({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-unna',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LUMETRA | Agencia de Marketing Digital',
  description: 'Creamos publicidad que se siente, no solo se ve. Fusionamos estrategia y creatividad para construir identidades visuales únicas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${bentham.variable} ${unna.variable}`}>
      <body className="font-bentham antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}