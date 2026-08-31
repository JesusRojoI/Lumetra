export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Phone is optional
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 3;
};

export const validateMessage = (message: string): boolean => {
  return message.trim().length >= 10;
};

export const validateCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleaned);
};

export const validateCardName = (name: string): boolean => {
  return name.trim().length >= 3;
};

export const validateCardExpiry = (month: string, year: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  
  const expMonth = parseInt(month);
  const expYear = parseInt('20' + year);
  
  if (isNaN(expMonth) || isNaN(expYear)) return false;
  if (expMonth < 1 || expMonth > 12) return false;
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validatePostalCode = (postalCode: string): boolean => {
  return /^\d{5}$/.test(postalCode);
};

export const validateAmount = (amount: string): boolean => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && /^\d+(\.\d{1,2})?$/.test(amount);
};