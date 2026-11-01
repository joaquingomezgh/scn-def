"use client";

import SpecialOffer from "@/components/SpecialOffer";
import { useActiveOffer, useActiveWeekly } from "@/components/useActiveOffer";
import WeeklyOffers from "@/components/WeeklyOffers";

// Una sola pared de ofertas: primero las de la semana y después la especial. Cada bloque se oculta
// solo cuando vence; si no queda ninguno, la sección entera desaparece
export default function Offers() {
  const { weekly } = useActiveWeekly();
  const { offer } = useActiveOffer();
  if (!weekly && !offer) return null;

  return (
    <section id="ofertas" className="azulejos scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="border border-linea bg-azulejo px-6 py-5 sm:px-10 sm:py-8">
          <h2 className="font-display text-6xl leading-none font-extrabold sm:text-8xl">Ofertas</h2>
        </div>
        <WeeklyOffers />
        <SpecialOffer />
      </div>
    </section>
  );
}
