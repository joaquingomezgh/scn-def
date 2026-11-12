"use client";

import { useSections } from "@/components/sections";

// Los azulejos de la pared: un acceso por sección, todos iguales.
// Se usan en el hero y dentro del menú de mobile. Si la cantidad es impar, el último ocupa dos columnas
export default function QuickLinks({ onNavigate }: { onNavigate?: () => void }) {
  const sections = useSections();

  return (
    <nav
      aria-label="Secciones"
      className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none"
    >
      {sections.map(({ href, label, hint, Icon }, i) => {
        const wide = sections.length % 2 === 1 && i === sections.length - 1;
        return (
          <a
            key={href}
            href={href}
            onClick={onNavigate}
            className={`group flex min-h-36 flex-col justify-between gap-4 border border-linea bg-azulejo p-4 transition-colors hover:border-carmesi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi active:bg-marmol sm:min-h-40 sm:p-5 ${wide ? "col-span-2 sm:col-span-1" : ""}`}
          >
            <Icon size={26} className="text-carmesi" aria-hidden />
            <span>
              <span className="font-display block text-lg leading-tight font-extrabold group-hover:text-carmesi">
                {label}
              </span>
              <span className="mt-1 block text-sm leading-snug text-gris">{hint}</span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}
