"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Clock, MapPin, Phone, Search } from "lucide-react";
import { branches } from "@/data/branches";

// Leaflet necesita `window`, así que el mapa solo se carga en el navegador
const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => <div className="h-[440px] border border-linea bg-azulejo sm:h-[560px]" />,
});

const views = [
  { id: "lista", label: "Lista", emoji: "📋" },
  { id: "mapa", label: "Mapa", emoji: "🗺️" },
] as const;

// Minúsculas y sin tildes, para que "nestor" encuentre "Néstor"
const normalize = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export default function BranchFinder() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<(typeof views)[number]["id"]>("lista");
  const q = normalize(query.trim());
  const results = branches.filter((b) =>
    normalize(`${b.name} ${b.address} ${b.city}`).includes(q),
  );

  return (
    <section id="sucursales" className="scroll-mt-16 bg-marmol">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-2xl font-bold sm:text-4xl">Nuestras sucursales</h2>

        <label htmlFor="buscar" className="mt-8 block font-medium">
          Buscá por barrio, calle o nombre
        </label>
        <div className="relative mt-2 max-w-xl">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-gris"
            size={20}
            aria-hidden
          />
          <input
            id="buscar"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej.: Centro, Belgrano…"
            className="w-full rounded-full border border-linea bg-azulejo py-3 pr-4 pl-12 text-base outline-none focus:border-carmesi focus:ring-2 focus:ring-carmesi/20"
          />
        </div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <div
            role="group"
            aria-label="Ver sucursales como"
            className="grid w-full max-w-sm grid-cols-2 gap-1 rounded-full border-2 border-carmesi/25 bg-azulejo p-1.5 shadow-[0_6px_16px_rgb(163_22_46/0.12)]"
          >
            {views.map(({ id, label, emoji }) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-semibold text-gris transition-colors hover:bg-marmol hover:text-tinta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi aria-pressed:bg-carmesi aria-pressed:text-white aria-pressed:hover:bg-carmesi-oscuro"
              >
                <span className="text-xl leading-none" aria-hidden>
                  {emoji}
                </span>
                {label}
              </button>
            ))}
          </div>
          <p className="text-sm text-gris" aria-live="polite">
            {results.length === 1 ? "1 sucursal" : `${results.length} sucursales`}
          </p>
        </div>

        {results.length === 0 ? (
          <p className="mt-6 border border-linea bg-azulejo p-6">
            No hay sucursales que coincidan con «{query}». Probá con el nombre del barrio o de la
            calle.
          </p>
        ) : view === "mapa" ? (
          <div className="mt-6">
            <BranchMap items={results} />
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-linea border border-linea bg-azulejo">
            {results.map((b) => (
              <li
                key={b.id}
                className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6"
              >
                <div>
                  <h3 className="text-lg font-semibold">{b.name}</h3>
                  <p className="mt-1 text-gris">
                    {b.address}, {b.city}
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <Clock className="shrink-0 text-perejil" size={16} aria-hidden />
                    {b.hours}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${b.phone.replace(/\D/g, "")}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-linea px-4 py-2 text-sm font-medium hover:border-carmesi hover:text-carmesi"
                  >
                    <Phone size={16} aria-hidden />
                    Llamar
                  </a>
                  <a
                    href={b.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-carmesi px-4 py-2 text-sm font-medium text-white hover:bg-carmesi-oscuro"
                  >
                    <MapPin size={16} aria-hidden />
                    Cómo llegar
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
