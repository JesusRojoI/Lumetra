'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import { products } from '@/data/products';
import { useTranslations } from 'next-intl';

export default function TiendaPage() {
  const searchParams = useSearchParams();
  const orderBy = searchParams.get('orderby') || 'default';
  const t = useTranslations('shop');
  
  const [sortedProducts, setSortedProducts] = useState(products.slice(0, 6));
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    let sorted = [...products];
    
    switch (orderBy) {
      case 'popularity':
        // Simular orden por popularidad (usando featured primero)
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'latest':
        // Simular orden por últimos (invertir array)
        sorted.reverse();
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        // Orden por defecto (orden original)
        break;
    }
    
    // Obtener productos de la página actual
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setSortedProducts(sorted.slice(startIndex, endIndex));
  }, [orderBy, currentPage]);

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value;
    const url = newOrder === 'default' 
      ? '/tienda/' 
      : `/tienda/?orderby=${newOrder}`;
    window.location.href = url;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Encabezado */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary font-unna mb-4 md:mb-0">
              {t('title')}
            </h1>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t('showing')} 1–6 {t('of')} 13 {t('results')}
              </span>
              
              <select
                value={orderBy}
                onChange={handleOrderChange}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg text-primary focus:border-accent focus:outline-none"
              >
                <option value="default">{t('sort.default')}</option>
                <option value="popularity">{t('sort.popularity')}</option>
                <option value="latest">{t('sort.latest')}</option>
                <option value="price-asc">{t('sort.price_asc')}</option>
                <option value="price-desc">{t('sort.price_desc')}</option>
              </select>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Paginación */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/tienda"
            orderBy={orderBy !== 'default' ? orderBy : undefined}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}