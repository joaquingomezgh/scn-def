// Ofertas de la semana: una tanda de varios productos. No tienen fecha de cierre porque el local no las
// cambia cada semana: quedan publicadas hasta que se reemplaza este objeto, y cuando no hay ninguna se deja en `null`.

export type WeeklyItem = {
  product: string;
  price: number; // precio de oferta, en pesos
  unit: string;
  note?: string; // condición corta, por ejemplo "Llevando 3 kilos"
  image?: string; // foto recortada en public/ofertas/, por ejemplo "/ofertas/vacio.webp"
};

export type WeeklyOffers = {
  terms: string;
  items: WeeklyItem[];
};

export const weeklyOffers: WeeklyOffers | null = {
  terms: "En todas las sucursales o hasta agotar stock.",
  items: [
    { product: "Pulpa de ternera", price: 39000, unit: "los 2 kilos", image: "/ofertas/pulpa-de-ternera.webp" },
    { product: "Pollo", price: 3800, unit: "el kilo", image: "/ofertas/pollo.webp" },
    { product: "Suprema", price: 16900, unit: "los 2 kilos", image: "/ofertas/supremas-de-pollo.webp" },
    { product: "Cajón de pollo", price: 73000, unit: "el cajón", image: "/ofertas/cajon-de-pollo.webp" },
    { product: "Bondiola de cerdo", price: 9300, unit: "el kilo", image: "/ofertas/bondiola-de-cerdo.webp" },
    { product: "Milanesas", price: 27000, unit: "los 2 kilos", image: "/ofertas/milanesas-de-carne.webp" },
    { product: "Marucha o paleta", price: 27000, unit: "los 2 kilos", image: "/ofertas/marucha.webp" },
    { product: "Costeleta", price: 27900, unit: "los 2 kilos", image: "/ofertas/costeleta.webp" },
  ],
};
