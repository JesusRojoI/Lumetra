'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/types/products';
import { products, getProductBySlug } from '@/data/products';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, customPrice?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  getLocalizedItemName: (item: CartItem, locale: string) => string;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getSubtotal: () => 0,
  getTax: () => 0,
  getTotal: () => 0,
  getItemCount: () => 0,
  getLocalizedItemName: () => '',
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('lumetra_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setItems([]);
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('lumetra_cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('lumetra_cart');
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1, customPrice?: number) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id && !item.customPrice
      );

      if (existingItemIndex > -1 && !product.custom) {
        // Si el producto ya existe y no es personalizado, actualizar cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Agregar nuevo item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          productId: product.id,
          slug: product.slug, // Guardar el slug para búsqueda
          name: product.name,
          price: customPrice || product.price,
          quantity: quantity,
          image: product.image,
          customPrice: product.custom || !!customPrice,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('lumetra_cart');
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.16;
  };

  const getTotal = () => {
    return getSubtotal() + getTax();
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getLocalizedItemName = (item: CartItem, locale: string) => {
    // Para productos personalizados, devolver el nombre guardado
    if (item.customPrice) {
      return item.name;
    }

    // Buscar el producto por slug o por id
    const product = products.find(
      (p) => p.slug === item.slug || p.id === item.productId
    );

    if (product) {
      return locale === 'es' ? product.name_es || product.name : product.name_en || product.name;
    }

    // Fallback al nombre guardado
    return item.name;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getSubtotal,
        getTax,
        getTotal,
        getItemCount,
        getLocalizedItemName,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}