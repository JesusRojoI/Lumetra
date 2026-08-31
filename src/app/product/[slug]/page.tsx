'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuantitySelector from '@/components/QuantitySelector';
import { getProductBySlug, getRelatedProducts, getLocalizedProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { formatCurrency } from '@/utils/format';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(slug, 4);
  const { addItem } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('product');
  
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-2xl text-primary">
            {locale === 'es' ? 'Producto no encontrado' : 'Product not found'}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const localizedProduct = getLocalizedProduct(product, locale);

  const handleAddToCart = () => {
    addItem(localizedProduct, quantity);
    setIsAdded(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <a href="/" className="hover:text-accent transition-colors">
                  {locale === 'es' ? 'Inicio' : 'Home'}
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/tienda/" className="hover:text-accent transition-colors">
                  {locale === 'es' ? 'Tienda' : 'Shop'}
                </a>
              </li>
              <li>/</li>
              <li className="text-primary font-semibold">{localizedProduct.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Imagen del producto */}
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-primary-light to-primary-dark shadow-custom">
                <Image
                  src={product.image}
                  alt={localizedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Información del producto */}
            <div className="lg:col-span-3">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-unna">
                {localizedProduct.name}
              </h1>
              
              {!product.custom ? (
                <div className="mb-6">
                  <span className="text-4xl font-bold text-accent">
                    {formatCurrency(product.price, locale)}
                  </span>
                  <span className="text-lg text-gray-500 ml-2">
                    MXN + {locale === 'es' ? 'IVA' : 'VAT'}
                  </span>
                </div>
              ) : (
                <p className="text-xl text-gray-600 mb-6">
                  {locale === 'es' ? 'Precio personalizado' : 'Custom price'}
                </p>
              )}

              {/* Descripción */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-4">
                  {t('description')}
                </h2>
                <ul className="space-y-3">
                  {localizedProduct.description.map((desc: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-teal mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cantidad y botón */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-primary mb-3">
                  {locale === 'es' ? 'Cantidad' : 'Quantity'}
                </label>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  min={1}
                  max={99}
                />
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full md:w-auto px-8 py-4 text-lg ${
                  isAdded ? 'btn-outline' : 'btn-primary'
                }`}
              >
                {isAdded ? t('view_cart') : t('add_to_cart')}
              </button>
            </div>
          </div>

          {/* Productos relacionados */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-primary mb-8 font-unna text-center">
              {t('related_products')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} compact />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}