'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('home.about');

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo con imagen y overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(/images/about-bg.jpg)' }} />
      <div className="absolute inset-0 bg-primary-dark/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-unna animate-slide-up">
          {t('title')}
        </h2>
        
        <div className="space-y-6 text-lg text-gray-200">
          <p className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('paragraph1')}
          </p>
          <p className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {t('paragraph2')}
          </p>
          <p className="animate-slide-up text-xl font-semibold text-white" style={{ animationDelay: '0.6s' }}>
            {t('paragraph3')}
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-12 h-1 w-24 bg-gradient-to-r from-accent to-gold mx-auto" />
      </div>
    </section>
  );
}