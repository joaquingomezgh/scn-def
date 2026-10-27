import { Check } from "lucide-react";

// Cortes agrupados por cómo se cocinan: así piensa el cliente en el mostrador
const groups = [
  { title: "Parrilla", cuts: ["Asado", "Vacío", "Entraña", "Matambre", "Chorizo y morcilla"] },
  { title: "Horno", cuts: ["Colita de cuadril", "Peceto", "Bondiola", "Pollo entero"] },
  { title: "Milanesas", cuts: ["Nalga", "Cuadrada", "Bola de lomo", "Pechuga de pollo"] },
  { title: "Guiso y olla", cuts: ["Osobuco", "Roast beef", "Falda", "Aguja"] },
];

const services = [
  "Milanesas preparadas",
  "Hamburguesas caseras",
  "Envasado al vacío",
  "Pedidos para eventos",
];

export default function Cuts() {
  return (
    <section id="cortes" className="scroll-mt-16 bg-marmol">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display max-w-[20ch] text-2xl font-bold sm:text-4xl">
          Qué llevar según lo que cocines
        </h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-gris">
          Una guía rápida para el mostrador. Si no sabés qué corte pedir, contanos qué vas a
          preparar y te recomendamos.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="font-display border-b-2 border-carmesi pb-2 text-lg font-bold sm:text-xl">
                {g.title}
              </h3>
              <ul className="mt-3 divide-y divide-linea">
                {g.cuts.map((c) => (
                  <li key={c} className="py-2.5">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-linea bg-azulejo p-6 sm:p-8">
          <h3 className="text-lg font-semibold">También preparamos</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <Check className="shrink-0 text-perejil" size={18} aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
