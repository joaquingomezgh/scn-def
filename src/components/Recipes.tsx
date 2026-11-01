import { ChefHat, ChevronDown, Clock, CookingPot, Flame, FlameKindling, Scale, Users } from "lucide-react";
import CutArt from "@/components/CutArt";
import { recipes } from "@/data/recipes";

const methods = {
  parrilla: { label: "A la parrilla", Icon: FlameKindling },
  horno: { label: "Al horno", Icon: Flame },
  olla: { label: "A la olla", Icon: CookingPot },
};

// Sello circular de la casa, como el de un recetario de familia
function Seal() {
  return (
    <div className="relative w-28 shrink-0 -rotate-6 sm:w-44 lg:w-52">
      <svg viewBox="0 0 160 160" className="w-full" aria-hidden>
        <circle cx="80" cy="80" r="78" className="fill-carmesi" />
        <circle
          cx="80"
          cy="80"
          r="50"
          className="fill-none stroke-white/60"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <path id="sello-recetas" d="M80,18 a62,62 0 1,1 0,124 a62,62 0 1,1 0,-124" fill="none" />
        <text className="font-display fill-white text-[12.5px] font-bold">
          <textPath href="#sello-recetas" textLength="386" lengthAdjust="spacing">
            RECETAS DE LA CASA ★ SUPERCARNES NÉSTOR ★
          </textPath>
        </text>
      </svg>
      <ChefHat
        className="absolute inset-0 m-auto size-9 text-white sm:size-12"
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  );
}

export default function Recipes() {
  return (
    <section id="recetas" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col gap-6 sm:flex-row-reverse sm:items-center sm:justify-between sm:gap-10">
          <Seal />
          <div>
            <h2 className="font-display max-w-[15ch] text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl">
              Las mejores recetas, con nuestros cortes premium
            </h2>
            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-gris">
              Las preparaciones que recomendamos en el mostrador. Cada receta te dice qué corte
              pedir y cuánto llevar, para que llegues a casa con todo listo.
            </p>
          </div>
        </div>

        {/* Subgrid: las partes de cada ficha quedan alineadas con las de sus vecinas */}
        <ul className="mt-14 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r) => {
            const { label, Icon } = methods[r.method];
            return (
              <li
                key={r.slug}
                className="ficha row-span-5 grid grid-rows-subgrid content-start gap-y-0 border border-linea bg-azulejo"
              >
                {/* Cabecera de la ficha: método de cocción y el dibujo del corte que se usa */}
                <div className="bg-carmesi p-5 text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-semibold text-carmesi">
                    <Icon size={15} aria-hidden />
                    {label}
                  </span>
                  <div className="mt-2 flex justify-center">
                    <CutArt art={r.art} />
                  </div>
                  <p className="mt-2 text-sm text-white/85">
                    Corte: <span className="font-semibold text-white">{r.cut}</span>
                  </p>
                </div>

                <h3 className="font-display px-5 pt-6 text-xl leading-snug font-extrabold sm:text-2xl">
                  {r.title}
                </h3>
                <p className="px-5 pt-3 leading-relaxed text-gris">{r.description}</p>

                {/* Ticket de mostrador: tiempo, porciones y qué pedir */}
                <dl className="mx-5 mt-5 border-y border-dashed border-gris/40 text-sm">
                  <div className="grid grid-cols-2 divide-x divide-dashed divide-gris/40">
                    <div className="flex items-center gap-2 py-3 pr-3">
                      <dt>
                        <Clock size={17} className="text-carmesi" aria-label="Tiempo" />
                      </dt>
                      <dd>{r.time}</dd>
                    </div>
                    <div className="flex items-center gap-2 py-3 pl-3">
                      <dt>
                        <Users size={17} className="text-carmesi" aria-label="Porciones" />
                      </dt>
                      <dd>{r.servings}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-t border-dashed border-gris/40 py-3 font-semibold">
                    <dt>
                      <Scale size={17} className="text-carmesi" aria-label="Qué pedir" />
                    </dt>
                    <dd>Pedí {r.order}</dd>
                  </div>
                </dl>

                <details className="group px-5 pb-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-semibold text-carmesi hover:text-carmesi-oscuro [&::-webkit-details-marker]:hidden">
                    <span className="group-open:hidden">Ver receta</span>
                    <span className="hidden group-open:inline">Ocultar receta</span>
                    <ChevronDown
                      size={18}
                      className="transition-transform group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </summary>
                  <div className="pb-4">
                    <h4 className="font-semibold">Ingredientes</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-gris marker:text-carmesi">
                      {r.ingredients.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                    <h4 className="mt-5 font-semibold">Paso a paso</h4>
                    <ol className="mt-2 list-decimal space-y-2 pl-5 leading-relaxed text-gris marker:font-bold marker:text-carmesi">
                      {r.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ol>
                  </div>
                </details>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex flex-col gap-5 border-t border-linea pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[48ch] text-lg leading-relaxed text-gris">
            ¿Elegiste receta? Contale al carnicero qué vas a preparar y te lo cortamos a medida.
          </p>
          <a
            href="#sucursales"
            className="shrink-0 rounded-full bg-carmesi px-6 py-3 text-center font-semibold text-white hover:bg-carmesi-oscuro"
          >
            Encontrá tu sucursal
          </a>
        </div>
      </div>
    </section>
  );
}
