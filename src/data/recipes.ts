// Recetas de la casa: cada una indica qué corte pedir y cuánto llevar en el mostrador
// TODO: validar recetas, tiempos y cantidades con la marca

import type { CowCutId } from "@/data/cow";

export type Recipe = {
  slug: string;
  title: string;
  method: "parrilla" | "horno" | "olla";
  // Corte que se pide y zona de la vaca de donde sale
  cut: string;
  zone: CowCutId;
  description: string;
  time: string;
  servings: string;
  // Lo que el cliente pide en el mostrador
  order: string;
  ingredients: string[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "ojo-de-bife-chimichurri",
    title: "Ojo de bife con chimichurri de la casa",
    method: "parrilla",
    cut: "Ojo de bife",
    zone: "ojo",
    description:
      "Bifes gruesos, sellados a fuego fuerte y terminados con el chimichurri que preparamos en el local.",
    time: "30 min",
    servings: "2 personas",
    order: "2 bifes de 3 cm (900 g)",
    ingredients: [
      "2 ojos de bife de 3 cm de espesor",
      "Sal parrillera",
      "1 taza de perejil picado",
      "2 dientes de ajo, orégano y ají molido",
      "Aceite de oliva y vinagre de vino",
    ],
    steps: [
      "Sacá los bifes de la heladera 30 minutos antes para que no lleguen fríos al fuego.",
      "Mezclá perejil, ajo, orégano y ají con aceite y un chorrito de vinagre. Dejalo reposar.",
      "Salá los bifes y sellalos a fuego fuerte 5 minutos por lado, sin pincharlos.",
      "Dejalos descansar 5 minutos antes de cortar y serví con el chimichurri.",
    ],
  },
  {
    slug: "vacio-crocante",
    title: "Vacío crocante a la parrilla",
    method: "parrilla",
    cut: "Vacío",
    zone: "vacio",
    description:
      "Cocción lenta del lado de la grasa hasta que la piel queda dorada y el interior jugoso.",
    time: "2 h 30 min",
    servings: "4 a 5 personas",
    order: "1 vacío entero (1,5 kg)",
    ingredients: ["1 vacío entero con su grasa", "Sal gruesa", "Limón (opcional)"],
    steps: [
      "Armá un fuego parejo y de intensidad media. El vacío pide paciencia, no brasa fuerte.",
      "Ponelo del lado de la grasa durante 1 h 45 min, renovando brasas cada tanto.",
      "Salá la parte de la carne, dalo vuelta y cociná 30 minutos más.",
      "Para la piel crocante, terminá 5 minutos más del lado de la grasa con brasa más fuerte.",
    ],
  },
  {
    slug: "tomahawk-manteca-hierbas",
    title: "Tomahawk a la manteca de hierbas",
    method: "parrilla",
    cut: "Ojo de bife con hueso",
    zone: "ojo",
    description:
      "El corte para una ocasión especial: hueso largo, marmoleo generoso y un final de manteca y romero.",
    time: "1 h",
    servings: "2 a 3 personas",
    order: "1 tomahawk (1,2 kg), encargalo",
    ingredients: [
      "1 tomahawk de 1,2 kg",
      "Sal en escamas y pimienta negra",
      "50 g de manteca",
      "Romero, tomillo y 2 dientes de ajo",
    ],
    steps: [
      "Cociná el tomahawk a fuego indirecto unos 40 minutos, hasta 50 °C en el centro.",
      "Pasalo a fuego directo y fuerte 3 minutos por lado para formar costra.",
      "Derretí la manteca con las hierbas y el ajo y bañá la carne en los últimos minutos.",
      "Dejalo descansar 10 minutos, cortá en láminas y terminá con sal en escamas.",
    ],
  },
  {
    slug: "colita-de-cuadril-al-horno",
    title: "Colita de cuadril al horno con papas",
    method: "horno",
    cut: "Colita de cuadril",
    zone: "cuadril",
    description: "Dorada en sartén y terminada en el horno sobre papas que se cocinan en su jugo.",
    time: "1 h 15 min",
    servings: "4 personas",
    order: "1 colita de cuadril (1,2 kg)",
    ingredients: [
      "1 colita de cuadril",
      "1 kg de papas en gajos",
      "1 cebolla en pluma",
      "Romero, ajo, sal y pimienta",
      "Aceite de oliva",
    ],
    steps: [
      "Precalentá el horno a 200 °C y condimentá la colita con sal, pimienta y ajo.",
      "Sellala en una sartén bien caliente hasta dorar todos los lados.",
      "Acomodá papas y cebolla en una fuente, la carne encima, y llevá al horno 45 minutos.",
      "Dejala reposar 10 minutos y cortá en contra de la fibra.",
    ],
  },
  {
    slug: "entrana-salsa-criolla",
    title: "Entraña con salsa criolla",
    method: "parrilla",
    cut: "Entraña",
    zone: "vacio",
    description: "Rápida, sabrosa y bien a punto. La pedimos limpia para que vaya directo al fuego.",
    time: "25 min",
    servings: "3 personas",
    order: "1 kg de entraña limpia",
    ingredients: [
      "1 kg de entraña limpia",
      "1 tomate, 1 cebolla y 1 morrón picados chico",
      "Aceite, vinagre, sal y orégano",
    ],
    steps: [
      "Prepará la criolla mezclando las verduras con aceite, vinagre, sal y orégano.",
      "Salá la entraña y llevala a fuego fuerte, 6 a 8 minutos por lado.",
      "Cortala en diagonal y serví con la salsa criolla por encima.",
    ],
  },
  {
    slug: "osobuco-al-malbec",
    title: "Osobuco braseado al malbec",
    method: "olla",
    cut: "Osobuco",
    zone: "osobuco",
    description:
      "Cocción larga en vino tinto hasta que la carne se separa del hueso. Ideal para los días fríos.",
    time: "3 h",
    servings: "4 personas",
    order: "4 rodajas de osobuco (1,6 kg)",
    ingredients: [
      "4 rodajas de osobuco",
      "2 tazas de malbec",
      "1 cebolla, 2 zanahorias y 1 rama de apio",
      "2 tazas de caldo y 1 lata de tomate",
      "Harina, laurel, sal y pimienta",
    ],
    steps: [
      "Pasá las rodajas por harina y dorales de ambos lados en una olla con aceite.",
      "Retirá la carne y rehogá cebolla, zanahoria y apio picados en la misma olla.",
      "Volvé a poner el osobuco, sumá el vino y dejá reducir 5 minutos.",
      "Agregá tomate, caldo y laurel, tapá y cociná a fuego bajo 2 h 30 min.",
    ],
  },
];
