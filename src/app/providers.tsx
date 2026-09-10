// src/app/providers.tsx
'use client';

import { NextIntlClientProvider } from 'next-intl';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';

export type Locale = 'es' | 'en';
export type Messages = typeof esMessages;

const messagesMap: Record<Locale, Messages> = {
  es: esMessages,
  en: enMessages as Messages,
};

const TIME_ZONE = 'America/Mexico_City';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function writeCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale?: Locale;
}

export function Providers({ children, initialLocale = 'es' }: ProvidersProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [messages, setMessages] = useState<Messages>(messagesMap[initialLocale]);

  useEffect(() => {
    const saved = (readCookie('NEXT_LOCALE') ||
      localStorage.getItem('locale') ||
      'es') as Locale;
    const valid: Locale = saved === 'en' ? 'en' : 'es';

    if (valid !== locale) {
      setLocaleState(valid);
      setMessages(messagesMap[valid]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLanguage = (newLocale: string) => {
    const valid: Locale = newLocale === 'en' ? 'en' : 'es';
    setLocaleState(valid);
    setMessages(messagesMap[valid]);
    writeCookie('NEXT_LOCALE', valid);
    localStorage.setItem('locale', valid);
  };

  return (
    <NextIntlClientProvider
      locale={locale}
      // @ts-expect-error: next-intl no tipa arrays, pero los soporta en runtime
      messages={messages}
      timeZone={TIME_ZONE}
    >
      <LanguageProvider
        value={{ locale, setLocale: changeLanguage } as any}
      >
        <CartProvider>{children}</CartProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}