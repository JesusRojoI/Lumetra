'use client';

import { NextIntlClientProvider } from 'next-intl';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { useState, useEffect } from 'react';
import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';

const messagesMap = {
  es: esMessages,
  en: enMessages,
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState('es');
  const [messages, setMessages] = useState<any>(esMessages);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'es';
    setLocale(savedLocale);
    setMessages(messagesMap[savedLocale as keyof typeof messagesMap] || esMessages);
  }, []);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    setMessages(messagesMap[newLocale as keyof typeof messagesMap] || esMessages);
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageProvider value={{ locale, setLocale: changeLanguage }}>
        <CartProvider>{children}</CartProvider>
      </LanguageProvider>
    </NextIntlClientProvider>
  );
}