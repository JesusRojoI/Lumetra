export const formatCurrency = (amount: number, locale: string = 'es'): string => {
  // Usar formato manual para evitar "MX$" en inglés
  const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$${formatted}`;
};

export const formatPrice = (amount: number, locale: string = 'es'): string => {
  const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formatted;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const formatOrderId = (orderId: string): string => {
  return orderId.toUpperCase();
};