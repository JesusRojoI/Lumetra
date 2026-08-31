'use server';

import axios from 'axios';

export interface PaymentData {
  amount: number;
  orderId: string;
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

// URL correcta de Keycop
const API_URL = "https://pagos.keycop.com.mx/api/v1";

async function getAuthToken() {
  try {
    console.log("Attempting authentication with Keycop...");
    console.log("API URL:", API_URL);
    
    const { data } = await axios.post(`${API_URL}/signin`, {
      email: process.env.KEYCOP_EMAIL,
      password: process.env.KEYCOP_PASSWORD
    });
    
    console.log("Authentication successful");
    return data.authToken;
  } catch (error: any) {
    console.error("Keycop Auth Error:", error.response?.data || error.message);
    throw new Error("authentication_failed");
  }
}

async function tokenizeCard(token: string, payment: PaymentData) {
  try {
    const card = payment.cardData;
    console.log("Tokenizing card...");
    
    const { data } = await axios.post(`${API_URL}/card/tokenizer`, {
      cardData: {
        cardNumber: card.number.replace(/\s/g, ''),
        cardholderName: card.name,
        expirationYear: card.year,
        expirationMonth: card.month
      }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log("Card tokenization successful");
    return data.cardNumberToken;
  } catch (error: any) {
    console.error("Keycop Tokenization Error:", error.response?.data || error.message);
    throw new Error("tokenization_failed");
  }
}

export async function processKeycopPayment(payment: PaymentData) {
  try {
    console.log("Processing payment with amount:", payment.amount);
    console.log("API URL:", API_URL);
    console.log("Keycop Email configured:", !!process.env.KEYCOP_EMAIL);
    console.log("Keycop Password configured:", !!process.env.KEYCOP_PASSWORD);

    // 1. Autenticación
    const authToken = await getAuthToken();
    console.log("Authentication successful");

    // 2. Tokenización (Sin el CVV)
    const cardToken = await tokenizeCard(authToken, payment);
    console.log("Card tokenization successful");

    // 3. Ejecución de la Venta
    const salePayload = {
      amount: Number(payment.amount),
      currency: "484",
      reference: payment.orderId,
      customerInformation: {
        firstName: payment.customer.nombre,
        lastName: payment.customer.apellido,
        email: payment.customer.email,
        phone1: payment.customer.telefono,
        address1: payment.customer.direccion,
        address2: payment.customer.direccion2 || "",
        city: payment.customer.ciudad,
        state: payment.customer.estado,
        postalCode: payment.customer.cp,
        country: payment.customer.pais || "MX",
        company: payment.customer.empresa || "",
        ip: payment.metadata?.ip || "127.0.0.1",
      },
      cardData: {
        cardNumberToken: cardToken,
        cvv: payment.cardData.cvv,
      },
    };

    console.log("Executing sale...");
    const { data } = await axios.post(`${API_URL}/sale`, salePayload, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    console.log("Sale response:", data);

    return {
      success: data.status === "APPROVED" || data.status === "approved",
      orderId: data.orderId,
      reference: data.reference,
      status: data.status,
      data: data
    };
  } catch (error: any) {
    console.error("Keycop Payment Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return {
      success: false,
      status: "error",
      error: error.message === "authentication_failed" ? "auth_error" : 
             error.message === "tokenization_failed" ? "token_error" : 
             "payment_error",
      details: error.response?.data?.message || error.message
    };
  }
}