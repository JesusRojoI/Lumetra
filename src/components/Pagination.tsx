'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  orderBy?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  orderBy,
}: PaginationProps) {
  const t = useTranslations('common');

  const getPageUrl = (page: number) => {
    const pagePath = page === 1 ? basePath : `${basePath}/page/${page}/`;
    return orderBy ? `${pagePath}?orderby=${orderBy}` : pagePath;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-12">
      <ul className="flex items-center space-x-2">
        {currentPage > 1 && (
          <li>
            <Link
              href={getPageUrl(currentPage - 1)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg text-primary hover:border-accent hover:text-accent transition-colors"
            >
              {t('buttons.previous')}
            </Link>
          </li>
        )}

        {pages.map((page) => (
          <li key={page}>
            <Link
              href={getPageUrl(page)}
              className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                page === currentPage
                  ? 'border-primary bg-primary text-white font-bold'
                  : 'border-gray-300 text-primary hover:border-accent hover:text-accent'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {currentPage < totalPages && (
          <li>
            <Link
              href={getPageUrl(currentPage + 1)}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg text-primary hover:border-accent hover:text-accent transition-colors"
            >
              {t('buttons.next')}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}