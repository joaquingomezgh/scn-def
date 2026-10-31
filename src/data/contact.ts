// TODO: reemplazar por el WhatsApp real de pedidos (549 + característica + número, sin 0 ni 15)
export const WHATSAPP = "5493564000000";

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
