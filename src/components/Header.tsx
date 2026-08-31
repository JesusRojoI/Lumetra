'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { formatCurrency, formatPrice } from '@/utils/format';

export default function Header() {
  const { items, removeItem, getSubtotal, getItemCount, getLocalizedItemName } = useCart();
  const { locale, setLocale } = useLanguage();
  const t = useTranslations('common');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Cerrar carrito al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };

  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="LUMETRA"
              width={150}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
            >
              {t('header.home')}
            </Link>
            <Link
              href="/tienda/"
              className="text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
            >
              {t('header.services')}
            </Link>
            <Link
              href="/#contacto"
              className="text-sm font-medium text-primary hover:text-accent transition-colors duration-300"
            >
              {t('header.contact')}
            </Link>

            {/* Carrito */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 text-primary hover:text-accent transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Dropdown del carrito */}
              {isCartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slide-down">
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-primary mb-3">{t('header.cart')}</h3>
                    {items.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        {locale === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}
                      </p>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <Image
                                  src={item.image}
                                  alt={getLocalizedItemName(item, locale)}
                                  width={40}
                                  height={40}
                                  className="rounded-md object-cover"
                                />
                                <div>
                                  <p className="text-sm font-medium text-primary">
                                    {getLocalizedItemName(item, locale)}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {item.quantity} × ${formatPrice(item.price, locale)}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">{t('header.subtotal')}:</span>
                            <span className="text-sm font-bold text-primary">
                              ${formatPrice(subtotal, locale)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <Link
                              href="/carrito/"
                              className="btn-primary w-full text-sm"
                              onClick={() => setIsCartOpen(false)}
                            >
                              {t('header.viewCart')}
                            </Link>
                            <Link
                              href="/finalizar-compra/"
                              className="btn-accent w-full text-sm"
                              onClick={() => setIsCartOpen(false)}
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

            {/* Selector de idioma */}
            <button
              onClick={handleLanguageChange}
              className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-300 hover:border-accent transition-colors"
            >
              {locale === 'es' ? (
                <>
                  <span className="text-lg">🇲🇽</span>
                  <span className="text-sm font-medium text-primary">ES</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🇺🇸</span>
                  <span className="text-sm font-medium text-primary">EN</span>
                </>
              )}
            </button>
          </nav>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-down">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.home')}
              </Link>
              <Link
                href="/tienda/"
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.services')}
              </Link>
              <Link
                href="/#contacto"
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.contact')}
              </Link>
              <Link
                href="/carrito/"
                className="text-primary hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('header.cart')} ({itemCount})
              </Link>
              <button
                onClick={handleLanguageChange}
                className="flex items-center space-x-2 px-3 py-1 rounded-full border border-gray-300 hover:border-accent transition-colors w-fit"
              >
                {locale === 'es' ? (
                  <>
                    <span className="text-lg">🇲🇽</span>
                    <span className="text-sm font-medium text-primary">ES</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-sm font-medium text-primary">EN</span>
                  </>
                )}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}