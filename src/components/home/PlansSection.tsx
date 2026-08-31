'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { products } from '@/data/products';
import { formatCurrency } from '@/utils/format';
import SectionTitle from '@/components/SectionTitle';

export default function PlansSection() {
  const t = useTranslations('home.plans');
  const tCommon = useTranslations('common');
  const { addItem } = useCart();
  const { locale } = useLanguage();

  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="nuestrosplanes" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('title')}
          subtitle={t('subtitle')}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-custom hover:shadow-custom-hover transition-all-custom overflow-hidden group animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-light to-primary-dark overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary mb-4 font-unna">
                  {product.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-accent">
                    {formatCurrency(product.price, locale)}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">+ {locale === 'es' ? 'IVA' : 'VAT'} (16%)</span>
                </div>

                <div className="space-y-2 mb-6">
                  {product.description.slice(0, 3).map((desc, i) => (
                    <div key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-teal mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-600">{desc}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/tienda/"
                  className="btn-primary w-full text-sm"
                >
                  {tCommon('buttons.startProject')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/tienda/"
            className="btn-outline text-lg px-8"
          >
            {tCommon('buttons.moreServices')}
          </Link>
        </div>
      </div>
    </section>
  );
}