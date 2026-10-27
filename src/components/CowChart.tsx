"use client";

import { useState } from "react";

// Silueta de la vaca, el símbolo de la casa. Las zonas de cortes se recortan con esta forma
const OUTLINE =
  "M100 84 C140 64 180 62 220 66 L340 66 C380 66 404 74 410 92 C414 120 410 160 400 186 L398 280 L378 280 L376 234 Q372 224 366 234 L364 280 L346 280 L348 214 Q280 232 200 214 L198 280 L178 280 L176 232 Q172 222 166 232 L166 280 L148 280 L146 210 C132 200 118 186 106 166 C96 154 82 150 70 152 L48 152 C36 152 30 142 34 130 L44 106 C52 90 66 80 84 78 L112 72 Z";

// Zonas aproximadas, como en el cartel de cortes de cualquier carnicería argentina
const cuts = [
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
];

export default function CowChart() {
  const [activeId, setActiveId] = useState("asado");
  const active = cuts.find((c) => c.id === activeId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
      <svg
        viewBox="20 40 420 252"
        className="w-full"
        role="img"
        aria-label={`Vaca dividida en sus cortes. Seleccionado: ${active.name}`}
      >
        <defs>
          <clipPath id="silueta-vaca">
            <path d={OUTLINE} />
          </clipPath>
        </defs>
        <g clipPath="url(#silueta-vaca)">
          {cuts.map((c) => (
            <polygon
              key={c.id}
              points={c.zone}
              onClick={() => setActiveId(c.id)}
              className={`cursor-pointer stroke-white/50 transition-[fill] duration-200 ${
                c.id === activeId ? "fill-white/30" : "fill-transparent hover:fill-white/15"
              }`}
              strokeWidth={1.5}
            />
          ))}
        </g>
        {/* Contorno, cuerno, cola y ojo: el dibujo de la vaca sobre las zonas */}
        <g
          className="pointer-events-none stroke-white"
          fill="none"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={OUTLINE} />
          <path d="M82 80 Q78 62 94 54" />
          <path d="M410 94 C424 124 424 172 420 204" />
          <path d="M420 204 l-6 18 M420 204 l2 19 M420 204 l9 16" strokeWidth={2.5} />
        </g>
        <circle cx="60" cy="108" r="4" className="fill-white" />
        <circle cx="42" cy="138" r="2.5" className="fill-white" />
      </svg>

      <div>
        <div aria-live="polite" className="border-l-2 border-white pl-5 lg:min-h-36">
          <p className="font-display text-2xl font-bold sm:text-3xl">{active.name}</p>
          <p className="mt-2 max-w-[40ch] leading-relaxed text-white/85">{active.text}</p>
        </div>

        <p className="mt-8 text-sm text-white/75">Tocá una zona de la vaca o elegí un corte:</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {cuts.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                aria-pressed={c.id === activeId}
                onClick={() => setActiveId(c.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  c.id === activeId
                    ? "border-white bg-white text-carmesi"
                    : "border-white/40 hover:border-white"
                }`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
