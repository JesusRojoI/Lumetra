'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useLanguage } from '@/context/LanguageContext';
import { validateEmail, validateName, validateMessage, validatePhone } from '@/utils/validation';
import { sendEmail } from '@/utils/email';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function ContactFormSection() {
  const t = useTranslations('home.form');
  const tCommon = useTranslations('common');
  const { locale } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

    if (!validateName(formData.name)) {
      newErrors.name = locale === 'es' ? 'El nombre debe tener al menos 3 caracteres' : 'Name must be at least 3 characters';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = locale === 'es' ? 'Ingresa un correo electrónico válido' : 'Enter a valid email address';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = locale === 'es' ? 'El teléfono debe tener 10 dígitos' : 'Phone must be 10 digits';
    }

    if (!validateMessage(formData.message)) {
      newErrors.message = locale === 'es' ? 'El mensaje debe tener al menos 10 caracteres' : 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await sendEmail({
        to: formData.email,
        subject: 'Contacto',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        type: 'contact',
        language: locale
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-cream to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-unna">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 font-semibold">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            {t('description')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-custom p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-primary mb-2">
                {t('name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-custom ${errors.name ? 'border-red-500' : ''}`}
                placeholder={locale === 'es' ? 'Tu nombre' : 'Your name'}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-primary mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-custom ${errors.email ? 'border-red-500' : ''}`}
                placeholder={locale === 'es' ? 'correo@ejemplo.com' : 'email@example.com'}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-bold text-primary mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`input-custom ${errors.phone ? 'border-red-500' : ''}`}
                placeholder={locale === 'es' ? '55 5555 5555' : '55 5555 5555'}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-bold text-primary mb-2">
                {t('message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                maxLength={180}
                className={`input-custom resize-none ${errors.message ? 'border-red-500' : ''}`}
                placeholder={t('message_placeholder')}
              />
              <div className="flex justify-between items-center mt-1">
                <div>
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                </div>
                <span className="text-sm text-gray-400">
                  {formData.message.length} / 180
                </span>
              </div>
            </div>
          </div>

          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {t('success')}
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {t('error')}
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full md:w-auto px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <LoadingSpinner size="small" color="white" /> : tCommon('buttons.send')}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}