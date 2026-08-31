'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/utils/format';

export default function CartIcon() {
  const { items, removeItem, getSubtotal, getItemCount } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  return (
    <div className="relative" ref={cartRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-gold transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slide-down z-50">
          <div className="p-4">
            <h3 className="text-lg font-bold text-primary mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {t('header.cart')}
            </h3>
            
            {items.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500">Tu carrito está vacío</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between group">
                      <div className="flex items-start space-x-3">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-primary">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {formatCurrency(item.price, locale)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">{t('header.subtotal')}:</span>
                    <span className="text-sm font-bold text-primary">
                      {formatCurrency(subtotal, locale)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/carrito/"
                      className="btn-primary text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('header.viewCart')}
                    </Link>
                    <Link
                      href="/finalizar-compra/"
                      className="btn-accent text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {t('header.checkout')}
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}