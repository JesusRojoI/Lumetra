'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function TerminosPage() {
  const t = useTranslations('legal.terms');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-unna">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-700 mb-1">{t('company')}</p>
          <p className="text-sm text-gray-500 mb-8">{t('last_updated')}</p>

          <p className="text-gray-700 mb-8">{t('intro')}</p>

          {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
            <section key={n} className="mb-6">
              <h2 className="text-xl font-bold text-primary mb-2 font-unna">
                {t(`section${n}_title` as any)}
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {t(`section${n}_content` as any)}
              </p>
            </section>
          ))}

          <p className="text-sm text-gray-500 mt-8">{t('validity')}</p>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-semibold">{t('contact_info')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}