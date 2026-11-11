// WhatsApp de la central de encargos. Es uno solo para toda la red: la central recibe los pedidos
// y le indica a cada cliente en qué sucursal retirarlos. Las sucursales no tienen número propio.
// TODO: reemplazar por el WhatsApp real de la central (549 + característica + número, sin 0 ni 15)
export const WHATSAPP_CENTRAL = "5493564000000";

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_CENTRAL}?text=${encodeURIComponent(text)}`;
