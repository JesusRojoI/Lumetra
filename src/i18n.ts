// src/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

const LOCALES = ['es', 'en'] as const;
const DEFAULT_LOCALE = 'es';
const TIME_ZONE = 'America/Mexico_City';

export default getRequestConfig(async () => {
  const headerLocale = headers().get('x-next-intl-locale');
  const locale = LOCALES.includes(headerLocale as any)
    ? (headerLocale as string)
    : DEFAULT_LOCALE;

  try {
    return {
      locale,
      timeZone: TIME_ZONE,
      messages: (await import(`../messages/${locale}.json`)).default,
    };
  } catch {
    return {
      locale: DEFAULT_LOCALE,
      timeZone: TIME_ZONE,
      messages: (await import(`../messages/es.json`)).default,
    };
  }
});