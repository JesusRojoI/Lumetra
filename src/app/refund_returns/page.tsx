'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function RefundReturnsPage() {
  const t = useTranslations('legal.refunds');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-unna">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-700 mb-8">{t('company')}</p>

          <p className="text-gray-700 mb-8">{t('intro')}</p>

          {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => {
            const titleKey = `section${n}_title` as any;
            const paragraphsKey = `section${n}_paragraphs` as any;
            const itemsKey = `section${n}_items` as any;

            const hasParagraphs = t.has ? t.has(paragraphsKey) : false;
            const hasItems = t.has ? t.has(itemsKey) : false;

            return (
              <section key={n} className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-3 font-unna">
                  {t(titleKey)}
                </h2>

                {hasParagraphs &&
                  (t.raw(paragraphsKey) as string[]).map((p, i) => (
                    <p key={i} className="text-gray-700 mb-3">
                      {p}
                    </p>
                  ))}

                {hasItems && (
                  <ul className="list-none space-y-2 text-gray-700">
                    {(t.raw(itemsKey) as string[]).map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}