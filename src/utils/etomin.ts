'use server';

import axios from 'axios';

export interface PaymentData {
  amount: number;
  orderId: string;
  currency?: string;
  cardData: {
    number: string;
    name: string;
    month: string;
    year: string;
    cvv: string;
  };
  customer: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    direccion: string;
    direccion2?: string;
    ciudad: string;
    estado: string;
    pais?: string;
    cp: string;
    empresa?: string;
  };
  metadata?: {
    ip?: string;
    deviceId?: string;
    notes?: string;
  };
}

// URL desde env var, con fallback a la oficial
const API_URL =
  process.env.ETOMIN_BASE_URL || 'https://pagos.etomin.com/api/v1';

// Instancia global con los headers base que exige Etomin
const etominClient = axios.create({
  baseURL: API_URL,
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

/**
 * Normaliza el año de expiración a 2 dígitos.
 * Acepta: "26", "2026", "  26  ", etc.
 * Devuelve siempre "YY" (ej. "26").
 */
function normalizeYear(year: string | number): string {
  const str = String(year).trim().replace(/\D/g, ''); // solo dígitos
  if (str.length === 4) return str.slice(-2); // "2026" -> "26"
  if (str.length === 2) return str; // "26" -> "26"
  if (str.length === 1) return str.padStart(2, '0'); // "6" -> "06"
  // Fallback: últimos 2 dígitos
  return str.slice(-2).padStart(2, '0');
}

/**
 * Normaliza el mes de expiración a 2 dígitos.
 * Acepta: "1", "01", " 1 ", etc.
 */
function normalizeMonth(month: string | number): string {
  const str = String(month).trim().replace(/\D/g, '');
  return str.padStart(2, '0'); // "1" -> "01"
}

async function getAuthToken(): Promise<string> {
  try {
    console.log('Attempting authentication with Etomin...');
    console.log('API URL:', API_URL);

    const { data } = await etominClient.post('/signin', {
      email: process.env.ETOMIN_USER,
      password: process.env.ETOMIN_PASSWORD,
    });

    console.log('Authentication successful');
    return data.authToken;
  } catch (error: any) {
    console.error('Etomin Auth Error:', error.response?.data || error.message);
    throw new Error('authentication_failed');
  }
}

async function tokenizeCard(
  token: string,
  payment: PaymentData
): Promise<string> {
  try {
    const card = payment.cardData;
    console.log('Tokenizing card...');

    const normalizedYear = normalizeYear(card.year);
    const normalizedMonth = normalizeMonth(card.month);

    const { data } = await etominClient.post(
      '/card/tokenizer',
      {
        cardData: {
          cardNumber: card.number.replace(/\s/g, ''),
          cardholderName: card.name,
          expirationYear: normalizedYear,
          expirationMonth: normalizedMonth,
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log('Card tokenization successful');
    return data.cardNumberToken;
  } catch (error: any) {
    console.error(
      'Etomin Tokenization Error:',
      error.response?.data || error.message
    );
    throw new Error('tokenization_failed');
  }
}

export async function processEtominPayment(payment: PaymentData) {
  try {
    console.log('Processing payment with amount:', payment.amount);
    console.log('API URL:', API_URL);
    console.log('Etomin User configured:', !!process.env.ETOMIN_USER);
    console.log(
      'Etomin Password configured:',
      !!process.env.ETOMIN_PASSWORD
    );

    // 1. Autenticación
    const authToken = await getAuthToken();
    console.log('Authentication successful');

    // 2. Tokenización de la tarjeta (Sin el CVV)
    const cardToken = await tokenizeCard(authToken, payment);
    console.log('Card tokenization successful');

    // 3. Resolver código de moneda
    const currency = (payment.currency || 'MXN').toUpperCase();
    const currencyCode = currency === 'USD' ? '840' : '484';

    // 4. Ejecución de la Venta
    const salePayload = {
      amount: Number(payment.amount),
      currency: currencyCode,
      reference: payment.orderId,
      customerInformation: {
        firstName: payment.customer.nombre,
        lastName: payment.customer.apellido,
        email: payment.customer.email,
        phone1: payment.customer.telefono,
        address1: payment.customer.direccion,
        address2: payment.customer.direccion2 || '',
        city: payment.customer.ciudad,
        state: payment.customer.estado,
        postalCode: payment.customer.cp,
        country: payment.customer.pais || 'MX',
        company: payment.customer.empresa || '',
        ip: payment.metadata?.ip || '127.0.0.1',
      },
      cardData: {
        cardNumberToken: cardToken,
        cvv: payment.cardData.cvv,
      },
    };

    console.log('Executing sale...');
    const { data } = await etominClient.post('/sale', salePayload, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    console.log('Sale response:', data);

    // Validación robusta del status (case-insensitive)
    const isApproved = data.status?.toUpperCase() === 'APPROVED';

    return {
      success: isApproved,
      orderId: data.orderId,
      reference: data.reference,
      transactionId: data.transactionId,
      status: data.status,
      data: data,
    };
  } catch (error: any) {
    console.error('Etomin Payment Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    return {
      success: false,
      status: 'error',
      error:
        error.message === 'authentication_failed'
          ? 'auth_error'
          : error.message === 'tokenization_failed'
            ? 'token_error'
            : 'payment_error',
      details:
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message,
    };
  }
}