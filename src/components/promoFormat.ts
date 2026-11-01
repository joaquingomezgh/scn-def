// Formatos compartidos por la oferta especial y las ofertas de la semana

// Números angostos, como los precios pintados con fibrón en una cartulina
export const NARROW = "[font-variation-settings:'wdth'_62] tracking-tight";

export const pesos = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });

const dateParts = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Argentina/Cordoba",
});

// "sábado 7 de noviembre a las 21:00", armado a mano para no depender de las comas de Intl
export function closing(iso: string) {
  const p = Object.fromEntries(dateParts.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  return `${p.weekday} ${p.day} de ${p.month} a las ${p.hour}:${p.minute}`;
}

// Estrella de "oferta" pegada en la esquina del cartel. Redondeada para que servidor y navegador coincidan
export const STAR = Array.from({ length: 28 }, (_, i) => {
  const r = i % 2 ? 41 : 50;
  const a = (Math.PI * i) / 14;
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)].map((n) => Math.round(n * 10) / 10).join(",");
}).join(" ");
