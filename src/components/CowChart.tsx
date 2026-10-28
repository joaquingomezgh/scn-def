"use client";

import { useState } from "react";
import {
  COW_HORN,
  COW_OUTLINE,
  COW_TAIL,
  COW_TAIL_TIP,
  COW_VIEWBOX,
  cowCuts as cuts,
} from "@/data/cow";

export default function CowChart() {
  const [activeId, setActiveId] = useState("asado");
  const active = cuts.find((c) => c.id === activeId)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
      <svg
        viewBox={COW_VIEWBOX}
        className="w-full"
        role="img"
        aria-label={`Vaca dividida en sus cortes. Seleccionado: ${active.name}`}
      >
        <defs>
          <clipPath id="silueta-vaca">
            <path d={COW_OUTLINE} />
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
          <path d={COW_OUTLINE} />
          <path d={COW_HORN} />
          <path d={COW_TAIL} />
          <path d={COW_TAIL_TIP} strokeWidth={2.5} />
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
