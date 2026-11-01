"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { CutArtId } from "@/data/recipes";

// Clases comunes del dibujo: contorno blanco, carne en carmesí oscuro y grasa en blanco translúcido
const contorno = "trazo relleno fill-carmesi-oscuro stroke-white";
const veta = "trazo detalle stroke-white/60";
const grasa = "relleno fill-white/40";

// Cada corte dibujado en un lienzo de 200 × 120, visto desde arriba como en la bandeja del mostrador
const arts: Record<CutArtId, ReactNode> = {
  // Bife redondeado, con la tapa separada por un hilo de grasa y bien marmolado
  ojo: (
    <>
      <path
        pathLength={1}
        className={contorno}
        d="M34 66 C30 40 58 22 98 22 C140 21 170 38 170 62 C171 88 148 102 114 100 C92 101 80 94 64 97 C46 100 36 86 34 66 Z"
      />
      <path pathLength={1} className="trazo detalle stroke-white/85" strokeWidth={4} d="M50 54 C66 38 126 34 160 52" />
      <path
        pathLength={1}
        className={veta}
        strokeWidth={1.75}
        d="M112 72 c10 2 16 -2 24 2 M98 76 c-8 4 -14 2 -22 8 M104 67 c0 -6 -6 -8 -4 -14 M70 66 c6 2 10 -2 16 0 M128 84 c6 -2 10 2 16 -2 M140 64 c4 2 8 0 12 4"
      />
      {/* El "ojo" de grasa que le da nombre al corte */}
      <path pathLength={1} className="relleno fill-white/75" d="M98 68 c4 -5 13 -4 14 2 c1 6 -7 9 -12 7 c-4 -1 -5 -6 -2 -9 Z" />
    </>
  ),
  // El mismo ojo de bife, con el hueso largo de la costilla
  tomahawk: (
    <>
      <path pathLength={1} className="relleno fill-white" d="M104 56 L172 50 L172 68 L104 74 Z" />
      <circle pathLength={1} className="relleno fill-white" cx={177} cy={51} r={8} />
      <circle pathLength={1} className="relleno fill-white" cx={177} cy={67} r={8} />
      <path
        pathLength={1}
        className={contorno}
        d="M22 64 C18 40 44 26 74 28 C102 30 116 44 114 64 C113 84 96 96 72 96 C44 97 25 86 22 64 Z"
      />
      <path pathLength={1} className="trazo detalle stroke-white/85" strokeWidth={4} d="M30 52 C42 36 84 34 106 48" />
      <path
        pathLength={1}
        className={veta}
        strokeWidth={1.75}
        d="M76 68 c8 2 14 -2 22 2 M62 72 c-6 4 -12 2 -18 8 M68 63 c0 -6 -6 -7 -4 -12 M36 64 c5 2 9 -2 14 0 M84 82 c6 -2 9 2 14 -2"
      />
      <path pathLength={1} className="relleno fill-white/75" d="M62 64 c4 -5 13 -4 14 2 c1 6 -7 9 -12 7 c-4 -1 -5 -6 -2 -9 Z" />
    </>
  ),
  // Pieza ancha y chata, con la capa de grasa que queda crocante y la fibra a lo largo
  vacio: (
    <>
      <path
        pathLength={1}
        className={contorno}
        d="M20 50 C40 36 70 42 100 36 C132 30 160 38 182 34 C188 50 186 70 180 86 C150 92 120 84 92 90 C62 96 40 88 22 92 C16 78 16 62 20 50 Z"
      />
      <path
        pathLength={1}
        className={grasa}
        d="M20 50 C40 36 70 42 100 36 C132 30 160 38 182 34 L183 45 C160 49 132 41 100 47 C70 53 42 47 20 60 Z"
      />
      <path pathLength={1} className={veta} d="M30 70 C70 62 120 70 172 60 M34 81 C70 76 96 80 128 76 M142 74 C154 73 164 72 176 70" />
    </>
  ),
  // Triángulo alargado con su tapa de grasa y la fibra que se abre en abanico
  cuadril: (
    <>
      <path
        pathLength={1}
        className={contorno}
        d="M26 84 C40 56 96 30 170 34 C182 35 184 48 174 54 C136 74 92 94 44 98 C30 99 22 92 26 84 Z"
      />
      <path
        pathLength={1}
        className={grasa}
        d="M26 84 C40 56 96 30 170 34 C178 35 181 40 178 45 C120 40 66 58 34 92 C28 91 24 88 26 84 Z"
      />
      <path pathLength={1} className={veta} d="M58 88 C84 72 120 60 160 51 M88 89 C112 79 136 67 162 56 M48 80 C66 64 90 54 120 48" />
    </>
  ),
  // Tira larga y finita, con la fibra cruzada que se nota al cortarla en diagonal
  entrana: (
    <>
      <path
        pathLength={1}
        className={contorno}
        d="M14 64 C36 46 66 54 98 48 C130 42 158 50 186 42 C192 48 192 60 186 64 C160 72 132 66 100 72 C68 78 40 72 18 78 C10 74 9 68 14 64 Z"
      />
      <path
        pathLength={1}
        className={veta}
        d="M32 58 l5 12 M50 56 l5 12 M68 56 l5 12 M86 55 l5 12 M104 53 l5 12 M122 51 l5 12 M140 52 l5 12 M158 52 l5 12 M174 49 l4 11"
      />
    </>
  ),
  // Rodaja con el hueso y su médula en el centro, y los músculos separados por nervios
  osobuco: (
    <>
      <path
        pathLength={1}
        className={contorno}
        d="M100 18 C130 16 156 34 158 60 C160 88 136 106 104 106 C72 107 44 90 42 62 C40 36 68 20 100 18 Z"
      />
      <path
        pathLength={1}
        className="trazo detalle stroke-white/35"
        strokeWidth={1.5}
        d="M100 27 C125 25 149 40 149 61 C150 83 130 97 104 97 C77 98 52 84 51 62 C50 41 73 28 100 27 Z"
      />
      <path pathLength={1} className={veta} d="M90 52 C76 44 64 38 58 30 M114 54 C128 46 140 44 152 46 M106 76 C112 88 116 96 120 104 M88 70 C76 78 62 82 46 80" />
      <circle pathLength={1} className="trazo relleno fill-white stroke-white" cx={100} cy={62} r={15} />
      <circle pathLength={1} className="relleno fill-[#e9b48c]" cx={100} cy={62} r={8} />
    </>
  ),
};

// Ilustración animada del corte: se dibuja sola al aparecer y larga vapor cuando la ficha está activa
export default function CutArt({ art }: { art: CutArtId }) {
  const ref = useRef<SVGSVGElement>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisto(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="6 -18 188 128"
      className={`corte h-32 w-auto sm:h-36${visto ? "trazar" : ""}`}
      fill="none"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Vapor que sube del corte, solo visible con la ficha activa */}
      <g className="vapor stroke-white/70" strokeWidth={2.5}>
        <path d="M76 14 q-6 -7 0 -14 q6 -7 0 -14" />
        <path d="M100 10 q-6 -7 0 -14 q6 -7 0 -14" />
        <path d="M124 14 q-6 -7 0 -14 q6 -7 0 -14" />
      </g>
      {/* Las formas usan pathLength={1} para que el trazo se dibuje igual en cualquier tamaño */}
      <g className="pieza">{arts[art]}</g>
    </svg>
  );
}
