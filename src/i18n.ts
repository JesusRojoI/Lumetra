import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Usar 'es' como locale por defecto si no hay locale
  const currentLocale = locale || 'es';
  
  try {
    return {
      messages: (await import(`../messages/${currentLocale}.json`)).default
    };
  } catch (error) {
    // Fallback a español si no encuentra el archivo
    return {
      messages: (await import(`../messages/es.json`)).default
    };
  }
});