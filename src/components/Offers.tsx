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
      {/* Sin título general: cada bloque trae el suyo ("Ofertas de la semana", "Oferta especial") */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 [&>:first-child]:mt-0">
        <WeeklyOffers />
        <SpecialOffer />
      </div>
    </section>
  );
}
