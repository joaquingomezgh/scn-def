import { branches, HORARIO } from "@/data/branches";

// Preguntas frecuentes. Están escritas con las palabras que la gente usa al buscar en Google
// ("carnicería en Frontera", "cuánta carne por persona"). Solo van datos confirmados:
// si algo cambia (horario, sucursales), se toma de branches.ts y se actualiza solo.

const porCiudad = (city: string) => branches.filter((b) => b.city === city).length;

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "¿Dónde hay una carnicería Supercarnes Néstor cerca?",
    answer: `Tenemos ${branches.length} sucursales: ${porCiudad("San Francisco")} en San Francisco (Córdoba), ${porCiudad("Frontera")} en Frontera (Santa Fe) y ${porCiudad("Devoto")} en Devoto (Córdoba). En la sección Sucursales podés buscar por calle y abrir la ruta en Google Maps.`,
  },
  {
    question: "¿Qué horario tienen las sucursales?",
    answer: `Todas las sucursales abren de ${HORARIO}.`,
  },
  {
    question: "¿Cómo hago un encargo?",
    answer:
      "Escribile a la central por WhatsApp con lo que necesitás. Te confirma el pedido y te dice en qué sucursal retirarlo. Es un solo número para toda la red.",
  },
  {
    question: "¿Hacen envíos a domicilio?",
    answer:
      "Sí, para encargos grandes hacemos envíos. Escribile a la central por WhatsApp con tu pedido y la dirección, y te confirma el envío.",
  },
  {
    question: "¿Qué medios de pago aceptan? ¿Se puede pagar con tarjeta o transferencia?",
    answer: "Aceptamos todos los medios de pago.",
  },
  {
    question: "¿Me cortan la carne a medida?",
    answer:
      "Sí. Cortamos en el momento con el espesor, el peso y la preparación que pidas. Cada sucursal recibe medias reses, así que podemos sacar el corte que necesites.",
  },
  {
    question: "¿Tienen cortes especiales como ojo de bife, entraña o matambre?",
    answer:
      "Sí. Los cortes especiales se pueden encargar por WhatsApp y te los tenemos listos para retirar en la sucursal que te quede cómoda.",
  },
  {
    question: "¿Cuánta carne hay que llevar para un asado?",
    answer:
      "Como referencia, unos 500 g por hombre, 400 g por mujer y 250 g por chico, con chorizos y morcillas incluidos. Con la calculadora de asado lo sacás según cuántos son y el apetito, y lo encargás directo por WhatsApp.",
  },
];
