// Dibujo de la vaca, el símbolo de la casa. Lo usan el cartel de cortes y las fichas de recetas

// Silueta: las zonas de cortes se recortan con esta forma
export const COW_OUTLINE =
  "M100 84 C140 64 180 62 220 66 L340 66 C380 66 404 74 410 92 C414 120 410 160 400 186 L398 280 L378 280 L376 234 Q372 224 366 234 L364 280 L346 280 L348 214 Q280 232 200 214 L198 280 L178 280 L176 232 Q172 222 166 232 L166 280 L148 280 L146 210 C132 200 118 186 106 166 C96 154 82 150 70 152 L48 152 C36 152 30 142 34 130 L44 106 C52 90 66 80 84 78 L112 72 Z";

// Cuerno y cola, que se dibujan sobre la silueta
export const COW_HORN = "M82 80 Q78 62 94 54";
export const COW_TAIL = "M410 94 C424 124 424 172 420 204";
export const COW_TAIL_TIP = "M420 204 l-6 18 M420 204 l2 19 M420 204 l9 16";

export const COW_VIEWBOX = "20 40 420 252";

// Zonas aproximadas, como en el cartel de cortes de cualquier carnicería argentina
export const cowCuts = [
  {
    id: "cogote",
    name: "Cogote",
    text: "Mucho colágeno y sabor. Para guisos, pucheros y todo lo que se cocina despacio.",
    zone: "98,30 152,30 142,138 98,150",
  },
  {
    id: "aguja",
    name: "Aguja y roast beef",
    text: "Sabrosos y con algo de grasa: estofados, carne al horno y picada especial.",
    zone: "152,30 222,30 218,128 142,138",
  },
  {
    id: "ojo",
    name: "Ojo de bife",
    text: "Bife ancho, bien marmolado y jugoso. De los cortes premium que más salen para la parrilla.",
    zone: "222,30 272,30 272,124 218,128",
  },
  {
    id: "lomo",
    name: "Lomo y bife de chorizo",
    text: "Lo más tierno de la vaca. Medallones, bifes gruesos a la plancha y carpaccio.",
    zone: "272,30 334,30 330,124 272,124",
  },
  {
    id: "cuadril",
    name: "Cuadril y colita",
    text: "Magros y versátiles: colita de cuadril al horno o bifes de cuadril a la parrilla.",
    zone: "334,30 440,30 440,120 330,124",
  },
  {
    id: "pecho",
    name: "Pecho",
    text: "Para hervir o al horno a fuego lento. Con tiempo queda tiernísimo.",
    zone: "98,150 142,138 176,172 172,228 98,228",
  },
  {
    id: "asado",
    name: "Asado",
    text: "La tira de costillas del domingo. Te la cortamos del ancho que quieras.",
    zone: "142,138 218,128 272,124 292,124 290,172 176,172",
  },
  {
    id: "falda",
    name: "Falda y matambre",
    text: "Falda para el puchero. El matambre, arrollado, a la pizza o a la parrilla.",
    zone: "176,172 290,172 292,228 172,228",
  },
  {
    id: "vacio",
    name: "Vacío y entraña",
    text: "Dos favoritos de la parrilla: jugosos y con la capa de grasa justa.",
    zone: "292,124 330,124 348,140 352,228 292,228",
  },
  {
    id: "pierna",
    name: "Nalga, peceto y cuadrada",
    text: "Los cortes magros de la pierna: milanesas, peceto al horno y vitel toné.",
    zone: "330,124 440,120 440,228 352,228 348,140",
  },
  {
    id: "osobuco",
    name: "Osobuco",
    text: "Con hueso y médula. Para guisos y el clásico osobuco a la cacerola.",
    zone: "0,228 480,228 480,300 0,300",
  },
] as const;

export type CowCutId = (typeof cowCuts)[number]["id"];
