'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'header' | 'footer';
}

export default function LanguageSelector({ variant = 'header' }: LanguageSelectorProps) {
  const { locale, setLocale } = useLanguage();

  const handleLanguageChange = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  const baseClasses = "flex items-center space-x-2 px-3 py-1 rounded-full border transition-colors duration-300";
  const variantClasses = variant === 'header'
    ? "border-gray-300 hover:border-accent bg-white/10 backdrop-blur-sm"
    : "border-gray-600 hover:border-gold bg-white/5";

  return (
    <button
      onClick={handleLanguageChange}
      className={`${baseClasses} ${variantClasses}`}
    >
      {locale === 'es' ? (
        <>
          <svg className="w-5 h-4" viewBox="0 0 24 16" fill="none">
            <rect width="24" height="16" rx="2" fill="#006847"/>
            <rect x="0" y="0" width="8" height="16" fill="#006847"/>
            <rect x="16" y="0" width="8" height="16" fill="#CE1126"/>
            <circle cx="12" cy="8" r="3" fill="#CE1126"/>
          </svg>
          <span className="text-sm font-medium">ES</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-4" viewBox="0 0 24 16" fill="none">
            <rect width="24" height="16" rx="2" fill="#B22234"/>
            {[...Array(7)].map((_, i) => (
              <rect
                key={i}
                x="0"
                y={i * 2.28}
                width="24"
                height="1.14"
                fill="white"
              />
            ))}
            <rect x="0" y="0" width="12" height="9.14" fill="#3C3B6E"/>
          </svg>
          <span className="text-sm font-medium">EN</span>
        </>
      )}
    </button>
  );
}