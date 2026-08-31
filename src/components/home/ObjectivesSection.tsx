'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ObjectivesSection() {
  const t = useTranslations('home.objectives');
  const [hoveredObjective, setHoveredObjective] = useState<number | null>(null);

  const objectives = [
    {
      id: 1,
      text: t('item1'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      id: 2,
      text: t('item2'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 3,
      text: t('item3'),
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/objectives-bg.jpg"
          alt="Objetivos"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/80" />
      </div>

      {/* Patrón decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-accent blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-gold blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-unna">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <p className="text-center text-lg text-gold font-semibold mb-16">
          {t('list_title')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Línea conectora */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {objectives.map((objective) => (
            <div
              key={objective.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredObjective(objective.id)}
              onMouseLeave={() => setHoveredObjective(null)}
            >
              {/* Círculo principal */}
              <div
                className={`relative w-64 h-64 md:w-72 md:h-72 rounded-full flex items-center justify-center transition-all duration-500 ${
                  hoveredObjective === objective.id
                    ? 'bg-accent shadow-2xl scale-105'
                    : 'bg-white/10 backdrop-blur-sm border-2 border-white/30'
                }`}
              >
                {/* Número del objetivo */}
                <div
                  className={`absolute transition-all duration-500 ${
                    hoveredObjective === objective.id
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-0'
                  }`}
                >
                  <span className="text-7xl font-bold text-white font-unna">
                    {objective.id}
                  </span>
                </div>

                {/* Contenido por defecto */}
                <div
                  className={`transition-all duration-500 text-center px-8 ${
                    hoveredObjective === objective.id
                      ? 'opacity-0 scale-0'
                      : 'opacity-100 scale-100'
                  }`}
                >
                  <div className="text-white mb-4 flex justify-center">
                    {objective.icon}
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    {objective.text}
                  </p>
                </div>

                {/* Anillo decorativo */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/20 animate-spin-slow" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}