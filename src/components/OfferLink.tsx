"use client";

import { useActiveOffer, useActiveWeekly } from "@/components/useActiveOffer";

// Link del menú a las ofertas: aparece y se va con la misma regla que la sección
export default function OfferLink() {
  const { offer } = useActiveOffer();
  const { weekly } = useActiveWeekly();
  if (!offer && !weekly) return null;

  return (
    <a href="#ofertas" className="hidden hover:text-carmesi sm:inline">
      Ofertas
    </a>
  );
}
