'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
  const t = useTranslations('legal.privacy');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-primary mb-8 font-unna text-center">
            {t('title')}
          </h1>
          
          <div className="bg-white rounded-lg shadow-custom p-8 space-y-6">
            <p className="text-gray-600">
              {t('last_updated')}
            </p>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 font-unna">
                {t('section1_title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('section1_content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 font-unna">
                {t('section2_title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('section2_content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 font-unna">
                {t('section3_title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('section3_content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4 font-unna">
                {t('section4_title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('section4_content')}
              </p>
            </section>

            <div className="mt-8 p-4 bg-cream rounded-lg">
              <p className="text-sm text-gray-500">
                {t('contact_info')}: administracion@lumetra.mx
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}