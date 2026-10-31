// Oferta especial del momento. Hay una sola a la vez: para cargar una nueva se reemplaza este objeto,
// y cuando no hay ninguna se deja en `null`. Al pasar `endsAt` la sección se oculta sola.

export type Offer = {
  product: string;
  detail: string;
  price: number; // precio de oferta, en pesos
  before?: number; // precio habitual, para mostrar cuánto se ahorra
  unit: string;
  endsAt: string; // fecha y hora de cierre con huso horario argentino (-03:00)
  terms: string;
  image?: string; // foto opcional guardada en public/ofertas/, por ejemplo "/ofertas/vacio.jpg"
};

export const offer: Offer | null = {
  product: "Asado de tira",
  detail: "De novillo, cortado en el momento al ancho que lo pidas.",
  price: 8990,
  before: 11500,
  unit: "el kilo",
  endsAt: "2026-11-07T21:00:00-03:00",
  terms: "En todas las sucursales o hasta agotar stock.",
};
