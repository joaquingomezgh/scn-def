"use client";

import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import Countdown from "@/components/Countdown";
import { closing, NARROW, pesos, STAR } from "@/components/promoFormat";
import { useActiveOffer } from "@/components/useActiveOffer";
import { whatsappLink } from "@/data/contact";
import type { Offer } from "@/data/offer";

// La cartulina fluo escrita a mano que se pega en la vidriera
function Poster({ offer }: { offer: Offer }) {
  const off = offer.before ? Math.round((1 - offer.price / offer.before) * 100) : 0;

  return (
    <div className="relative mx-auto w-full max-w-sm -rotate-2 bg-fluo px-6 pt-7 pb-6 text-tinta shadow-[0_20px_40px_rgb(43_34_32/0.35)] sm:px-8 sm:pt-9 lg:w-96">
      {/* La foto del corte, impresa y pegada sobre la cartulina */}
      {offer.image && (
        <div className="relative mb-6 aspect-[4/3] rotate-3 bg-white p-2 shadow-[0_4px_10px_rgb(43_34_32/0.2)]">
          <div className="relative size-full">
            <Image
              src={offer.image}
              alt={offer.product}
              fill
              sizes="(min-width: 1024px) 336px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      )}
      {/* El margen derecho hace que el nombre corte antes de la estrella del descuento */}
      <p className="font-display max-w-[11ch] pr-12 text-3xl leading-[1.05] font-extrabold sm:text-4xl">
        {offer.product}
      </p>
      <p className="mt-3 max-w-[30ch] leading-snug text-gris">{offer.detail}</p>

      <p className="mt-6 flex items-start text-carmesi">
        <span className="mt-[0.35em] text-3xl font-black sm:text-4xl">$</span>
        <span className={`${NARROW} text-[7.5rem] leading-[0.85] font-black tabular-nums sm:text-[9rem]`}>
          {pesos.format(offer.price)}
        </span>
      </p>
      <p className="mt-2 flex items-baseline justify-between gap-4 border-t-2 border-tinta pt-3 font-semibold">
        <span className="text-lg">{offer.unit}</span>
        {offer.before && (
          <span className="text-gris">
            Antes <s className="tabular-nums">${pesos.format(offer.before)}</s>
          </span>
        )}
      </p>

      {off > 0 && (
        <div className="absolute -top-9 -right-5 size-24 rotate-12 sm:-right-9 sm:size-28">
          <svg viewBox="0 0 100 100" className="size-full" aria-hidden>
            <polygon points={STAR} className="fill-carmesi stroke-white" strokeWidth={2} />
          </svg>
          <p className="absolute inset-0 grid place-content-center text-center leading-none font-black text-white">
            <span className={`${NARROW} text-3xl sm:text-4xl`}>−{off}%</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function SpecialOffer() {
  const { offer, secondsLeft } = useActiveOffer();
  if (!offer) return null;

  const message = `¡Hola Supercarnes Néstor! Quiero reservar la oferta especial de ${offer.product.toLowerCase()} a $${pesos.format(offer.price)} ${offer.unit}.`;

  return (
    <div id="oferta" className="mt-12 scroll-mt-20 bg-carmesi text-white sm:mt-16">
      <div className="grid gap-x-16 gap-y-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h3 className="font-display text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl">
            Oferta especial
          </h3>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/85">
            Cada tanto Néstor elige un corte y lo deja a un precio que no se repite. Dura pocos
            días: cuando llega a cero, vuelve a su precio de siempre.
          </p>
        </div>

        <div className="pt-4 lg:row-span-2 lg:pt-0 lg:pr-6">
          <Poster offer={offer} />
        </div>

        <div>
          <p className="font-semibold">Termina en</p>
          <div className="mt-3">
            <Countdown seconds={secondsLeft} />
          </div>
          <p className="mt-5 max-w-[46ch] text-white/85">
            Vale hasta el {closing(offer.endsAt)} h. {offer.terms}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-carmesi hover:bg-fluo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle size={20} aria-hidden />
              Reservar por WhatsApp
            </a>
            <a
              href="#sucursales"
              className="flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-3.5 font-semibold hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MapPin size={20} aria-hidden />
              Ver sucursales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
