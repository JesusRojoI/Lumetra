'use client';

import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${alignClasses[align]} mb-12`}>
      <h2
        className={`text-4xl md:text-5xl font-bold mb-4 font-unna ${
          light ? 'text-white' : 'text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-lg md:text-xl max-w-3xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`h-1 w-24 bg-gradient-to-r from-accent to-gold mt-4 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
}