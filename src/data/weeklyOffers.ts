// Ofertas de la semana: una tanda de varios productos que cierra toda junta. Para cargar una nueva se
// reemplaza este objeto, y cuando no hay ninguna se deja en `null`. Al pasar `endsAt` el panel se oculta solo.

export type WeeklyItem = {
  product: string;
  price: number; // precio de oferta, en pesos
  unit: string;
  note?: string; // condición corta, por ejemplo "Llevando 3 kilos"
};

export type WeeklyOffers = {
  endsAt: string; // fecha y hora de cierre con huso horario argentino (-03:00)
  terms: string;
  items: WeeklyItem[];
};

export const weeklyOffers: WeeklyOffers | null = {
  endsAt: "2026-11-22T21:00:00-03:00",
  terms: "En todas las sucursales o hasta agotar stock.",
  items: [
    { product: "Vacío", price: 10900, unit: "el kilo" },
    { product: "Matambre", price: 11500, unit: "el kilo" },
    { product: "Pechito de cerdo", price: 7490, unit: "el kilo" },
    { product: "Milanesa de nalga", price: 12500, unit: "el kilo", note: "Ya empanada" },
    { product: "Pollo entero", price: 3990, unit: "el kilo" },
    { product: "Chorizo de cerdo", price: 6900, unit: "el kilo", note: "Llevando 2 kilos" },
    { product: "Hamburguesas caseras", price: 8900, unit: "la docena" },
  ],
};
