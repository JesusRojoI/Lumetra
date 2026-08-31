'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { IconClock, IconLocation, IconPhone, IconEmail } from '@/components/icons';

export default function ContactInfoSection() {
  const t = useTranslations('home.contact_info');

  const contactInfo = [
    {
      icon: IconClock,
      label: t('schedule'),
      value: t('schedule_value'),
      color: 'text-accent'
    },
    {
      icon: IconLocation,
      label: t('address'),
      value: t('address_value'),
      color: 'text-teal'
    },
    {
      icon: IconPhone,
      label: t('phone'),
      value: '(+52) 1 55 5553 0519',
      color: 'text-gold'
    },
    {
      icon: IconEmail,
      label: t('email'),
      value: 'administracion@lumetra.mx',
      color: 'text-primary'
    }
  ];

  return (
    <section id="Hablemos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-unna">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 font-semibold">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mt-4">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="bg-cream rounded-lg p-6 text-center hover:shadow-custom-hover transition-all-custom animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-full ${info.color} bg-white shadow-custom flex items-center justify-center mx-auto mb-4`}>
                <info.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">
                {info.label}
              </h3>
              <p className="text-gray-600 break-words">
                {info.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}