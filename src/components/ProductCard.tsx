'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { Product } from '@/types/products';
import { formatCurrency } from '@/utils/format';
import { getLocalizedProduct } from '@/data/products';

interface ProductCardProps {
  product: Product & any;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addItem } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('common');
  const [isAdded, setIsAdded] = useState(false);

  const localizedProduct = getLocalizedProduct(product, locale);

  const handleAddToCart = () => {
    if (product.custom) {
      window.location.href = `/product/${product.slug}/`;
      return;
    }
    addItem(localizedProduct);
    setIsAdded(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-custom hover:shadow-custom-hover transition-all-custom overflow-hidden group">
      <Link href={`/product/${product.slug}/`} className="block relative">
        <div className="relative h-56 overflow-hidden bg-gradient-to-br from-primary-light to-primary-dark">
          <Image
            src={product.image}
            alt={localizedProduct.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
            {locale === 'es' ? 'Destacado' : 'Featured'}
          </span>
        )}
      </Link>
      
      <div className="p-5">
        <Link href={`/product/${product.slug}/`}>
          <h3 className="text-lg font-bold text-primary mb-2 hover:text-accent transition-colors">
            {localizedProduct.name}
          </h3>
        </Link>
        
        {!product.custom ? (
          <p className="text-sm text-gray-600 mb-4">
              {formatCurrency(product.price, locale)} MXN + {locale === 'es' ? 'IVA' : 'VAT'}
          </p>
        ) : (
          <p className="text-sm text-gray-600 mb-4">
            {locale === 'es' ? 'Precio personalizado' : 'Custom price'}
          </p>
        )}

        {product.custom ? (
          <Link
            href={`/product/${product.slug}/`}
            className="btn-outline w-full text-sm"
          >
            {t('buttons.pay')}
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            className={`w-full text-sm ${
              isAdded ? 'btn-outline' : 'btn-primary'
            }`}
          >
            {isAdded ? t('buttons.viewCart') : t('buttons.addToCart')}
          </button>
        )}
      </div>
    </div>
  );
}