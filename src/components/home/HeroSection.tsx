'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fondo con gradiente y patrón */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light" />
      
      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gold blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-teal blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
              <span className="text-sm text-white/90">LUMETRA</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-unna leading-tight">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-xl">
              {t('subtitle')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#nuestrosplanes"
                className="btn-accent text-lg px-8 py-4"
              >
                {tCommon('buttons.discoverMore')}
              </Link>
              <Link
                href="#Hablemos"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              >
                {tCommon('buttons.letsTalk')}
              </Link>
            </div>
          </div>

          {/* Elemento visual decorativo */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="w-96 h-96 rounded-full bg-gradient-to-br from-accent/20 to-gold/20 border-4 border-white/10 animate-float" />
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-accent/10 to-gold/10 border-2 border-white/20 animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-32 rounded-full bg-white/5 border border-white/10 animate-pulse-slow" />
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}