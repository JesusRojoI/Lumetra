'use client';

import { Suspense } from 'react';
import TiendaContent from '@/components/TiendaContent';

export default function TiendaPage2() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <TiendaContent initialPage={2} />
    </Suspense>
  );
}