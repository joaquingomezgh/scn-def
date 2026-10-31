"use client";

import { useActiveOffer } from "@/components/useActiveOffer";

// Link del menú a la oferta: aparece y se va con la misma regla que la sección
export default function OfferLink() {
  const { offer } = useActiveOffer();
  if (!offer) return null;

  return (
    <a href="#oferta" className="hidden hover:text-carmesi sm:inline">
      Oferta
    </a>
  );
}
