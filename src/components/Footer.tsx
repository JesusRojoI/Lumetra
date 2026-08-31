'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations('common');

  const handleLanguageChange = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  return (
    <footer className="bg-gradient-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logos de pago */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/mastercard.svg"
                alt="Mastercard"
                width={50}
                height={30}
                className="bg-white rounded p-1"
              />
              <Image
                src="/visa.svg"
                alt="Visa"
                width={50}
                height={30}
                className="bg-white rounded p-1"
              />
            </div>
            <p className="text-sm text-gray-300">{t('footer.payments')}</p>
          </div>

          {/* Links legales */}
          <div className="flex flex-col items-center space-y-3">
            <Link
              href="/politica-de-privacidad/"
              className="text-sm text-gray-300 hover:text-gold transition-colors"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              href="/terminos-y-condiciones-de-servicio/"
              className="text-sm text-gray-300 hover:text-gold transition-colors"
            >
              {t('footer.terms')}
            </Link>
            <Link
              href="/refund_returns/"
              className="text-sm text-gray-300 hover:text-gold transition-colors"
            >
              {t('footer.refunds')}
            </Link>
          </div>

          {/* Selector de idioma */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <button
              onClick={handleLanguageChange}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-600 hover:border-gold transition-colors"
            >
              {locale === 'es' ? (
                <>
                  <span className="text-lg">🇲🇽</span>
                  <span className="text-sm font-medium text-white">ES</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-sm font-medium text-white">EN</span>
                </>
              )}
            </button>
            <p className="text-xs text-gray-400">
              © 2024 LUMETRA. {t('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}