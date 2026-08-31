'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/utils/format';
import { countries } from '@/data/countries';
import { mexicanStates } from '@/data/states';
import {
  validateEmail,
  validateName,
  validatePhone,
  validateCardNumber,
  validateCardName,
  validateCardExpiry,
  validateCVV,
  validatePostalCode
} from '@/utils/validation';
import { processKeycopPayment } from '@/utils/keycop';
import { sendEmail } from '@/utils/email';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTax, getTotal, clearCart, getLocalizedItemName } = useCart();
  const { locale } = useLanguage();
  const t = useTranslations('checkout');
  const tPayment = useTranslations('payment');

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    empresa: '',
    pais: 'MX',
    direccion: '',
    colonia: '',
    ciudad: '',
    estado: 'CDMX',
    cp: '',
    telefono: '',
    email: '',
    notas: '',
    cardName: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCVV: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : '';
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.nombre)) {
      newErrors.nombre = locale === 'es' ? 'El nombre es obligatorio (mínimo 3 caracteres)' : 'Name is required (minimum 3 characters)';
    }

    if (!validateName(formData.apellidos)) {
      newErrors.apellidos = locale === 'es' ? 'Los apellidos son obligatorios (mínimo 3 caracteres)' : 'Last name is required (minimum 3 characters)';
    }

    if (formData.direccion.trim().length < 5) {
      newErrors.direccion = locale === 'es' ? 'La dirección es obligatoria' : 'Address is required';
    }

    if (formData.colonia.trim().length < 3) {
      newErrors.colonia = locale === 'es' ? 'La colonia es obligatoria' : 'Neighborhood is required';
    }

    if (formData.ciudad.trim().length < 3) {
      newErrors.ciudad = locale === 'es' ? 'La ciudad es obligatoria' : 'City is required';
    }

    if (!validatePostalCode(formData.cp)) {
      newErrors.cp = locale === 'es' ? 'El código postal debe tener 5 dígitos' : 'Postal code must be 5 digits';
    }

    if (!validatePhone(formData.telefono)) {
      newErrors.telefono = locale === 'es' ? 'El teléfono debe tener 10 dígitos' : 'Phone must be 10 digits';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = locale === 'es' ? 'Ingresa un correo válido' : 'Enter a valid email';
    }

    if (!validateCardName(formData.cardName)) {
      newErrors.cardName = locale === 'es' ? 'Ingresa el nombre en la tarjeta' : 'Enter the name on card';
    }

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = locale === 'es' ? 'Número de tarjeta inválido (16 dígitos)' : 'Invalid card number (16 digits)';
    }

    if (!validateCardExpiry(formData.cardMonth, formData.cardYear)) {
      newErrors.cardMonth = locale === 'es' ? 'Fecha de expiración inválida' : 'Invalid expiration date';
    }

    if (!validateCVV(formData.cardCVV)) {
      newErrors.cardCVV = locale === 'es' ? 'CVV inválido (3-4 dígitos)' : 'Invalid CVV (3-4 digits)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = {
        amount: total,
        orderId: `LUM-${Date.now()}`,
        cardData: {
          number: formData.cardNumber,
          name: formData.cardName,
          month: formData.cardMonth,
          year: formData.cardYear,
          cvv: formData.cardCVV
        },
        customer: {
          nombre: formData.nombre,
          apellido: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          direccion2: formData.colonia,
          ciudad: formData.ciudad,
          estado: formData.estado,
          pais: formData.pais,
          cp: formData.cp,
          empresa: formData.empresa
        },
        metadata: {
          notes: formData.notas
        }
      };

      const paymentResult = await processKeycopPayment(paymentData);

      if (paymentResult.success) {
        const orderData = {
          nombre: `${formData.nombre} ${formData.apellidos}`,
          productos: items.map((item) => ({
            nombre: getLocalizedItemName(item, locale),
            cantidad: item.quantity,
            precio: item.price
          })),
          subtotal: subtotal,
          impuesto: tax,
          total: total,
          transactionId: paymentResult.reference || paymentResult.orderId
        };

        await sendEmail({
          to: formData.email,
          subject: locale === 'es' ? '¡Compra confirmada! - LUMETRA' : 'Purchase Confirmed! - LUMETRA',
          type: 'purchase',
          orderData: orderData,
          language: locale
        });

        sessionStorage.setItem('lumetra_last_order', JSON.stringify(orderData));

        clearCart();
        router.push('/compra-exitosa/');
      } else {
        // Mostrar error específico según el código
        switch (paymentResult.error) {
          case 'auth_error':
            setPaymentError(tPayment('auth_error'));
            break;
          case 'token_error':
            setPaymentError(tPayment('token_error'));
            break;
          case 'payment_error':
            setPaymentError(tPayment('payment_error'));
            break;
          default:
            setPaymentError(tPayment('processing_error'));
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setPaymentError(tPayment('processing_error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-primary mb-12 font-unna text-center">
            {t('title')}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Columna izquierda - Formulario */}
              <div className="lg:col-span-2 space-y-8">
                {/* Detalles de facturación */}
                <div className="bg-white rounded-lg shadow-custom p-6">
                  <h2 className="text-2xl font-bold text-primary mb-6 font-unna">
                    {t('billing_details')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('first_name')}
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`input-custom ${errors.nombre ? 'border-red-500' : ''}`}
                      />
                      {errors.nombre && (
                        <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('last_name')}
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        className={`input-custom ${errors.apellidos ? 'border-red-500' : ''}`}
                      />
                      {errors.apellidos && (
                        <p className="text-red-500 text-sm mt-1">{errors.apellidos}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('company')}
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        className="input-custom"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('country')}
                      </label>
                      <select
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        className="input-custom"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code}>
                            {locale === 'es' ? country.name_es : country.name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('address')}
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder={locale === 'es' ? 'Número de la casa y nombre de la calle' : 'House number and street name'}
                        className={`input-custom ${errors.direccion ? 'border-red-500' : ''}`}
                      />
                      {errors.direccion && (
                        <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('neighborhood')}
                      </label>
                      <input
                        type="text"
                        name="colonia"
                        value={formData.colonia}
                        onChange={handleChange}
                        placeholder={locale === 'es' ? 'Colonia, Apartamento, habitación, escalera, etc.' : 'Neighborhood, Apartment, room, stairs, etc.'}
                        className={`input-custom ${errors.colonia ? 'border-red-500' : ''}`}
                      />
                      {errors.colonia && (
                        <p className="text-red-500 text-sm mt-1">{errors.colonia}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('city')}
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        className={`input-custom ${errors.ciudad ? 'border-red-500' : ''}`}
                      />
                      {errors.ciudad && (
                        <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('state')}
                      </label>
                      <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleChange}
                        className="input-custom"
                      >
                        {mexicanStates.map((state) => (
                          <option key={state.code} value={state.code}>
                            {locale === 'es' ? state.name_es : state.name_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('postal_code')}
                      </label>
                      <input
                        type="text"
                        name="cp"
                        value={formData.cp}
                        onChange={handleChange}
                        maxLength={5}
                        className={`input-custom ${errors.cp ? 'border-red-500' : ''}`}
                      />
                      {errors.cp && (
                        <p className="text-red-500 text-sm mt-1">{errors.cp}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('phone')}
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        maxLength={10}
                        className={`input-custom ${errors.telefono ? 'border-red-500' : ''}`}
                      />
                      {errors.telefono && (
                        <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('email')}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-custom ${errors.email ? 'border-red-500' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('notes')}
                      </label>
                      <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        rows={3}
                        placeholder={locale === 'es' ? 'Detalles adicionales del pedido, referencias de la dirección, etc' : 'Additional order details, address references, etc'}
                        className="input-custom resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Datos de pago */}
                <div className="bg-white rounded-lg shadow-custom p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <h2 className="text-2xl font-bold text-primary font-unna">
                      {t('payment')}
                    </h2>
                    <Image
                      src="/keycop.png"
                      alt="Keycop"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                    <Image
                      src="/secure.svg"
                      alt="Secure"
                      width={30}
                      height={30}
                    />
                  </div>

                  <p className="text-gray-600 mb-6">
                    {t('payment_description')}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('card_name')}
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`input-custom ${errors.cardName ? 'border-red-500' : ''}`}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        {t('card_number')}
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className={`input-custom ${errors.cardNumber ? 'border-red-500' : ''}`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-primary mb-2">
                          {t('expiry')}
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            name="cardMonth"
                            value={formData.cardMonth}
                            onChange={handleChange}
                            maxLength={2}
                            placeholder="MM"
                            className={`input-custom text-center ${errors.cardMonth ? 'border-red-500' : ''}`}
                          />
                          <span className="text-2xl text-gray-400">/</span>
                          <input
                            type="text"
                            name="cardYear"
                            value={formData.cardYear}
                            onChange={handleChange}
                            maxLength={2}
                            placeholder="YY"
                            className={`input-custom text-center ${errors.cardMonth ? 'border-red-500' : ''}`}
                          />
                        </div>
                        {errors.cardMonth && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardMonth}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-primary mb-2">
                          {t('cvv')}
                        </label>
                        <input
                          type="password"
                          name="cardCVV"
                          value={formData.cardCVV}
                          onChange={handleChange}
                          maxLength={4}
                          placeholder="•••"
                          className={`input-custom text-center ${errors.cardCVV ? 'border-red-500' : ''}`}
                        />
                        {errors.cardCVV && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardCVV}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna derecha - Resumen */}
              <div className="lg:col-span-1">
                <div className="bg-cream rounded-lg shadow-custom p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-primary mb-6 font-unna">
                    {t('order_summary')}
                  </h2>

                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-primary">
                            {getLocalizedItemName(item, locale)} × {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-primary">
                          ${formatPrice(item.price * item.quantity, locale)}
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
                    <div className="flex justify-between items-center border-t-2 border-gray-300 pt-3">
                      <span className="text-lg font-bold text-primary">{t('total')}</span>
                      <span className="text-2xl font-bold text-accent">
                        ${formatPrice(total, locale)}
                      </span>
                    </div>
                  </div>

                  {paymentError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {paymentError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing || items.length === 0}
                    className="btn-accent w-full mt-6 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <LoadingSpinner size="small" color="white" />
                    ) : (
                      t('place_order')
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}