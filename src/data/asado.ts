// Fórmulas del Asadómetro. Son cantidades orientativas: el carnicero las ajusta en el mostrador.

export type Appetite = "liviano" | "normal" | "asadero";
export type MeatMix = "vacuno" | "mix";

export type AsadoInput = {
  men: number;
  women: number;
  kids: number;
  appetite: Appetite;
  mix: MeatMix;
  offal: boolean;
};

export type Line = { label: string; amount: string };

// Gramos de carne por persona con apetito normal
const GRAMS = { men: 500, women: 400, kids: 250 };
export const APPETITE = { liviano: 0.8, normal: 1, asadero: 1.2 };

// Cómo se reparte la carne principal según el tipo de asado
const CUTS: Record<MeatMix, [string, number][]> = {
  vacuno: [
    ["Vacío", 0.35],
    ["Tapa de asado", 0.35],
    ["Costillar", 0.3],
  ],
  mix: [
    ["Vacío", 0.25],
    ["Tapa de asado", 0.2],
    ["Costillar", 0.15],
    ["Bondiola o matambrito de cerdo", 0.25],
    ["Pata y muslo de pollo", 0.15],
  ],
};

const SAUSAGE_KG = 0.1; // un chorizo o una morcilla pesa unos 100 g

const kgFmt = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
// Redondea para arriba al siguiente múltiplo de `step`: mejor que sobre a que falte
const up = (n: number, step: number) => Math.ceil(n / step - 1e-9) * step;
const kg = (n: number) => `${kgFmt.format(n)} kg`;

export function calcAsado(i: AsadoInput) {
  const people = i.men + i.women + i.kids;
  const adults = i.men + i.women;
  const total =
    (i.men * GRAMS.men + i.women * GRAMS.women + i.kids * GRAMS.kids) *
    APPETITE[i.appetite] /
    1000;

  const chorizos = i.offal ? Math.ceil(adults + i.kids / 2) : 0;
  const morcillas = i.offal ? Math.ceil(adults / 2) : 0;
  const offalKg = i.offal ? up(adults * 0.08, 0.25) : 0;

  // Las achuras y embutidos reemplazan parte de la carne, sin bajar del 60 %
  const meat = Math.max(total - (chorizos + morcillas) * SAUSAGE_KG - offalKg, total * 0.6);
  const cuts: Line[] = CUTS[i.mix].map(([label, share]) => ({
    label,
    amount: kg(up(meat * share, 0.1)),
  }));

  const extras: Line[] = i.offal
    ? [
        { label: "Chorizos", amount: `${chorizos} u.` },
        { label: "Morcillas", amount: `${morcillas} u.` },
        ...(offalKg > 0 ? [{ label: "Chinchulines, molleja y riñón", amount: kg(offalKg) }] : []),
      ]
    : [];

  const fire: Line[] = [
    { label: "Carbón o leña", amount: kg(up(total * 1.5, 1)) },
    { label: "Pan", amount: `${up(adults * 100 + i.kids * 50, 50)} g` },
    { label: "Sal gruesa", amount: `${up(total * 20, 50)} g` },
  ];

  return { people, total, cuts, extras, fire };
}

export const formatKg = (n: number) => kgFmt.format(n);
