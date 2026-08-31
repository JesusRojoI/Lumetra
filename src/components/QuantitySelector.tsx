'use client';

import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  const decrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const increment = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
      {/* Botón decrementar */}
      <button
        onClick={decrement}
        className="w-12 h-12 flex items-center justify-center text-primary hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>
      
      {/* Cantidad */}
      <div className="w-16 h-12 flex items-center justify-center border-x-2 border-gray-300">
        <span className="text-lg font-bold text-primary">
          {quantity}
        </span>
      </div>
      
      {/* Botón incrementar */}
      <button
        onClick={increment}
        className="w-12 h-12 flex items-center justify-center text-primary hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}