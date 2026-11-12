// WhatsApp de la central de encargos. Es uno solo para toda la red: la central recibe los pedidos
// y le indica a cada cliente en qué sucursal retirarlos. Las sucursales no tienen número propio.
// Formato wa.me: 549 + característica + número, sin 0 ni 15 (+54 9 3564 58-0277)
export const WHATSAPP_CENTRAL = "5493564580277";

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_CENTRAL}?text=${encodeURIComponent(text)}`;
