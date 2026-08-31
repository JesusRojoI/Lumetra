'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuantitySelector from '@/components/QuantitySelector';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/utils/format';
import { IconTrash } from '@/components/icons';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getTotal, getLocalizedItemName } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('cart');

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-primary mb-12 font-unna text-center">
            {t('title')}
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-2xl text-gray-500 mb-8">{t('empty')}</p>
              <Link href="/tienda/" className="btn-primary px-8 py-3 text-lg">
                {t('go_shop')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Tabla de productos */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-custom overflow-hidden">
                  {/* Encabezado de tabla */}
                  <div className="hidden md:grid grid-cols-4 gap-4 bg-primary text-white px-6 py-4 font-bold">
                    <div>{t('product')}</div>
                    <div className="text-center">{t('quantity')}</div>
                    <div className="text-right">{t('subtotal')}</div>
                    <div className="text-center">{t('remove')}</div>
                  </div>

                  {/* Items del carrito */}
                  <div className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                        {/* Producto */}
                        <div className="flex items-center space-x-4">
                          <Image
                            src={item.image}
                            alt={getLocalizedItemName(item, locale)}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <p className="font-semibold text-primary">
                              {getLocalizedItemName(item, locale)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${formatPrice(item.price, locale)}
                            </p>
                            {item.customPrice && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                                {t('custom')}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Cantidad */}
                        <div className="flex justify-center">
                          <QuantitySelector
                            quantity={item.quantity}
                            onQuantityChange={(newQty) => updateQuantity(item.id, newQty)}
                            min={1}
                            max={99}
                          />
                        </div>

                        {/* Subtotal */}
                        <div className="text-right font-bold text-primary">
                          ${formatPrice(item.price * item.quantity, locale)}
                        </div>

                        {/* Eliminar */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          >
                            <IconTrash className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resumen del carrito */}
              <div className="lg:col-span-1">
                <div className="bg-cream rounded-lg shadow-custom p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-primary mb-6 font-unna">
                    {t('summary')}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('subtotal')}</span>
                      <span className="font-semibold text-primary">
                        ${formatPrice(subtotal, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('tax')}</span>
                      <span className="font-semibold text-primary">
                        ${formatPrice(tax, locale)}
                      </span>
                    </div>
                    <div className="border-t-2 border-gray-300 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{t('total')}</span>
                        <span className="text-2xl font-bold text-accent">
                          ${formatPrice(total, locale)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/finalizar-compra/"
                    className="btn-accent w-full mt-6 py-4 text-lg"
                  >
                    {t('checkout')}
                  </Link>

                  <Link
                    href="/tienda/"
                    className="btn-outline w-full mt-3 py-3"
                  >
                    {t('continue')}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}