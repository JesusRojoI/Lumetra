'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const advantages = [
  'Estrategias personalizadas: cada servicio se adapta al estado actual de tu marca y a las metas que deseas alcanzar.',
  'Visión integral: analizamos tu identidad, comunicación, presencia digital y desempeño para crear coherencia en todos tus canales.',
  'Acompañamiento experto: nuestro equipo combina talento creativo con visión estratégica para impulsar resultados reales.',
  'Optimización constante: medimos, ajustamos y mejoramos cada acción para garantizar un crecimiento sostenible y auténtico.',
  'Resultados medibles: cada entrega incluye un informe o diagnóstico que traduce la creatividad en datos y decisiones claras.'
];

export default function WhySection() {
  const t = useTranslations('home.why');
  const [currentAdvantage, setCurrentAdvantage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdvantage((prev) => (prev + 1) % advantages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Columna izquierda */}
          <div className="text-left animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-unna">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-300 mb-4">
              {t('paragraph1')}
            </p>
            <p className="text-lg text-gray-300 mb-4">
              {t('paragraph2')}
            </p>
            <p className="text-lg text-gray-300">
              {t('paragraph3')}
            </p>
          </div>

          {/* Columna derecha - Ventajas */}
          <div className="relative">
            <h3 className="text-2xl font-bold text-gold mb-8 text-center font-unna">
              {t('advantages_title')}
            </h3>
            
            {/* Indicadores de ventajas */}
            <div className="flex justify-center space-x-2 mb-8">
              {advantages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAdvantage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentAdvantage
                      ? 'bg-accent w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Ventaja actual */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 animate-scale-in">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-white text-lg leading-relaxed">
                  {advantages[currentAdvantage]}
                </p>
              </div>
            </div>

            {/* Contador */}
            <div className="text-center mt-4 text-white/50 text-sm">
              {currentAdvantage + 1} / {advantages.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}