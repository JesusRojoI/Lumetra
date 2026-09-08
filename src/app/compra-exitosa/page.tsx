'use client';

export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/utils/format';
import { products } from '@/data/products';

export default function PurchaseSuccessPage() {
  const router = useRouter();
  const { items, getLocalizedItemName } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('success');

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Recuperar datos de la orden del sessionStorage
    const savedOrder = sessionStorage.getItem('lumetra_last_order');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrderData(parsedOrder);
      } catch (error) {
        console.error('Error loading order data:', error);
      }
    }
  }, []);

  const subtotal = orderData?.subtotal || 0;
  const tax = orderData?.impuesto || 0;
  const total = orderData?.total || 0;

  // Función para obtener el nombre traducido del producto
  const getTranslatedProductName = (productName: string): string => {
    // Buscar el producto en la lista de productos
    const product = products.find(
      (p) => 
        p.name === productName || 
        p.name_es === productName || 
        p.name_en === productName
    );

    if (product) {
      return locale === 'es' ? product.name_es || product.name : product.name_en || product.name;
    }

    // Si no se encuentra, devolver el nombre original
    return productName;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Icono de éxito */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-unna">
              {t('title')}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Detalles de la orden */}
          {orderData && (
            <div className="bg-white rounded-lg shadow-custom p-8 mb-8 animate-slide-up">
              <h2 className="text-2xl font-bold text-primary mb-6 font-unna">
                {t('order_details')}
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-600">{t('transaction')}</span>
                  <span className="font-semibold text-primary">
                    {orderData.transactionId}
                  </span>
                </div>

                <div className="space-y-3">
                  {orderData.productos?.map((producto: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-primary">
                          {getTranslatedProductName(producto.nombre)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {t('quantity')}: {producto.cantidad}
                        </p>
                      </div>
                      <span className="font-semibold text-primary">
                        ${formatPrice(producto.precio * producto.cantidad, locale)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-gray-300 pt-4 space-y-3">
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
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">{t('total')}</span>
                    <span className="text-2xl font-bold text-accent">
                      ${formatPrice(total, locale)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Aviso de email */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-blue-700 text-sm">
                    {t('email_notice')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Botón continuar */}
          <div className="text-center">
            <Link
              href="/tienda/"
              className="btn-primary px-12 py-4 text-lg inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {t('continue_shopping')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}