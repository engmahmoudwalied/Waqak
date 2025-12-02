export const sendWhatsAppMessage = (message: string) => {
  const phoneNumber = '+201200186404';
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const getQuoteMessage = (language: 'ar' | 'en') => {
  if (language === 'ar') {
    return 'مرحباً، أريد الحصول على عرض سعر لخدماتكم. يرجى التواصل معي.';
  }
  return 'Hello, I would like to get a quote for your services. Please contact me.';
};

export const browseWorkMessage = (language: 'ar' | 'en') => {
  if (language === 'ar') {
    return 'مرحباً، أريد الاطلاع على أعمالكم السابقة والخدمات المتاحة.';
  }
  return 'Hello, I would like to see your previous work and available services.';
};