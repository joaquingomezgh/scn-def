// Fórmulas de la Calculadora de asado. Son cantidades orientativas: el carnicero las ajusta en el mostrador.

export type Appetite = "liviano" | "normal" | "asadero";
export type PlanId = "clasico" | "especial";

export type AsadoInput = {
  men: number;
  women: number;
  kids: number;
  appetite: Appetite;
};

export type Line = { label: string; amount: string };

// Gramos de carne por persona con apetito normal (embutidos incluidos)
const GRAMS = { men: 500, women: 400, kids: 250 };
export const APPETITE = { liviano: 0.8, normal: 1, asadero: 1.2 };

// Dos propuestas con los cortes que más lleva la gente: pocos cortes y en cantidades redondas.
// `share` es la parte del corte principal; el resto va al segundo corte.
type Plan = {
  id: PlanId;
  label: string;
  description: string;
  cuts: [main: string, second: string];
  share: number;
  morcilla: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "clasico",
    label: "Clásico",
    description: "El de todos los domingos: tira de asado, vacío, chorizo y morcilla.",
    cuts: ["Asado de tira", "Vacío"],
    share: 0.6,
    morcilla: true,
  },
  {
    id: "especial",
    label: "Especial",
    description: "Para darse un gusto: vacío y entraña, con chorizos de entrada.",
    cuts: ["Vacío", "Entraña"],
    share: 0.65,
    morcilla: false,
  },
];

const SAUSAGE_KG = 0.1; // un chorizo o una morcilla pesa unos 100 g
const STEP = 0.5; // los cortes se piden de a medio kilo
const MIN_SECOND = 1; // con menos de 1 kg del segundo corte, conviene llevar uno solo

const kgFmt = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
// Redondea para arriba al siguiente múltiplo de `step`: mejor que sobre a que falte
const up = (n: number, step: number) => Math.ceil(n / step - 1e-9) * step;
const kg = (n: number) => `${kgFmt.format(n)} kg`;

export function calcAsado(i: AsadoInput, planId: PlanId) {
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const people = i.men + i.women + i.kids;
  const adults = i.men + i.women;
  const total =
    (i.men * GRAMS.men + i.women * GRAMS.women + i.kids * GRAMS.kids) *
    APPETITE[i.appetite] /
    1000;

  // Un chorizo por adulto y uno cada dos chicos; una morcilla cada dos adultos
  const chorizos = people === 0 ? 0 : Math.max(1, Math.ceil(adults + i.kids / 2));
  const morcillas = plan.morcilla ? Math.ceil(adults / 2) : 0;

  // Los embutidos reemplazan parte de la carne, sin bajar del 70 %
  const meat = up(Math.max(total - (chorizos + morcillas) * SAUSAGE_KG, total * 0.7), STEP);
  // El segundo corte lleva al menos 1 kg; si no alcanza para eso, va un solo corte
  const second = Math.max(meat - up(meat * plan.share, STEP), MIN_SECOND);
  const main = meat - second;
  const [mainCut, secondCut] = plan.cuts;

  const cuts: Line[] =
    meat === 0
      ? []
      : main < MIN_SECOND
        ? [{ label: mainCut, amount: kg(meat) }]
        : [
            { label: mainCut, amount: kg(main) },
            { label: secondCut, amount: kg(second) },
          ];

  const sausages: Line[] = [
    ...(chorizos > 0 ? [{ label: "Chorizos", amount: `${chorizos} u.` }] : []),
    ...(morcillas > 0 ? [{ label: "Morcillas", amount: `${morcillas} u.` }] : []),
  ];

  const fire: Line[] = people === 0 ? [] : [{ label: "Carbón", amount: kg(up(total * 1.5, 1)) }];

  return { plan, people, total, lines: [...cuts, ...sausages, ...fire] };
}

export const formatKg = (n: number) => kgFmt.format(n);
