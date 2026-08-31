'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import QuantitySelector from '@/components/QuantitySelector';
import { getProductBySlug, getRelatedProducts, getLocalizedProduct } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { validateAmount, validateEmail, validateName } from '@/utils/validation';
import { sendEmail } from '@/utils/email';

export default function CustomProductPage() {
  const router = useRouter();
  const product = getProductBySlug('producto-de-prueba');
  const relatedProducts = getRelatedProducts('producto-de-prueba', 4);
  const { addItem } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('custom_product');
  
  const [formData, setFormData] = useState({
    price: '',
    name: '',
    email: '',
    folio: '',
    description: ''
  });
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAdded, setIsAdded] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateAmount(formData.price)) {
      newErrors.price = locale === 'es' ? 'Ingresa un monto válido mayor a 0' : 'Enter a valid amount greater than 0';
    }

    if (!validateName(formData.name)) {
      newErrors.name = locale === 'es' ? 'El nombre debe tener al menos 3 caracteres' : 'Name must be at least 3 characters';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = locale === 'es' ? 'Ingresa un correo válido' : 'Enter a valid email';
    }

    if (formData.folio.trim().length < 1) {
      newErrors.folio = locale === 'es' ? 'El folio es obligatorio' : 'Folio is required';
    }

    if (formData.description.trim().length < 3) {
      newErrors.description = locale === 'es' ? 'La descripción debe tener al menos 3 caracteres' : 'Description must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCart = async () => {
    if (!validateForm()) return;

    setIsSendingEmail(true);

    const price = parseFloat(formData.price);

    // Agregar al carrito
    addItem(localizedProduct, quantity, price);
    setIsAdded(true);

    // Enviar correo de aviso
    try {
      await sendEmail({
        to: formData.email,
        subject: locale === 'es' ? 'Servicio personalizado agregado - LUMETRA' : 'Custom Service Added - LUMETRA',
        type: 'custom_product',
        orderData: {
          nombre: formData.name,
          email: formData.email,
          folio: formData.folio,
          descripcion: formData.description,
          costo: price,
          cantidad: quantity
        },
        language: locale
      });
    } catch (error) {
      console.error('Error sending custom product email:', error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleViewCart = () => {
    router.push('/carrito/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Imagen */}
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-primary-light to-primary-dark shadow-custom">
                <Image
                  src={product.image}
                  alt={localizedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Formulario */}
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4 font-unna">
                {localizedProduct.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6">
                {localizedProduct.description[0]}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {localizedProduct.description[1]}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    {t('cost')}
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0.01"
                    disabled={isAdded}
                    className={`input-custom ${errors.price ? 'border-red-500' : ''} ${isAdded ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isAdded}
                    className={`input-custom ${errors.name ? 'border-red-500' : ''} ${isAdded ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isAdded}
                    className={`input-custom ${errors.email ? 'border-red-500' : ''} ${isAdded ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    {t('folio')}
                  </label>
                  <input
                    type="text"
                    name="folio"
                    value={formData.folio}
                    onChange={handleChange}
                    disabled={isAdded}
                    className={`input-custom ${errors.folio ? 'border-red-500' : ''} ${isAdded ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.folio && (
                    <p className="text-red-500 text-sm mt-1">{errors.folio}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    {t('description')}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    disabled={isAdded}
                    className={`input-custom resize-none ${errors.description ? 'border-red-500' : ''} ${isAdded ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-3">
                    {t('quantity')}
                  </label>
                  <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    min={1}
                    max={99}
                  />
                </div>

                <div className="flex space-x-4">
                  {isAdded ? (
                    <button
                      onClick={handleViewCart}
                      className="flex-1 px-8 py-4 text-lg btn-outline"
                    >
                      {t('view_cart')}
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      disabled={isSendingEmail}
                      className="flex-1 px-8 py-4 text-lg btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSendingEmail ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {locale === 'es' ? 'Procesando...' : 'Processing...'}
                        </span>
                      ) : (
                        t('pay')
                      )}
                    </button>
                  )}
                  <Link
                    href="/#contacto"
                    className="btn-outline px-8 py-4 text-lg"
                  >
                    {t('quote')}
                  </Link>
                </div>
              </div>
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