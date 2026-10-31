"use client";

import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { useActiveOffer } from "@/components/useActiveOffer";
import { whatsappLink } from "@/data/contact";
import type { Offer } from "@/data/offer";

// Números angostos, como los precios pintados con fibrón en una cartulina
const NARROW = "[font-variation-settings:'wdth'_62] tracking-tight";

const pesos = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const dateParts = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
  timeZone: "America/Argentina/Cordoba",
});

// "sábado 7 de noviembre a las 21:00", armado a mano para no depender de las comas de Intl
function closing(iso: string) {
  const p = Object.fromEntries(dateParts.formatToParts(new Date(iso)).map((x) => [x.type, x.value]));
  return `${p.weekday} ${p.day} de ${p.month} a las ${p.hour}:${p.minute}`;
}

// Estrella de "oferta" pegada en la esquina del cartel. Redondeada para que servidor y navegador coincidan
const STAR = Array.from({ length: 28 }, (_, i) => {
  const r = i % 2 ? 41 : 50;
  const a = (Math.PI * i) / 14;
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)].map((n) => Math.round(n * 10) / 10).join(",");
}).join(" ");

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
      <p className="font-display max-w-[11ch] text-3xl leading-[1.05] font-extrabold sm:text-4xl">
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

// Cuenta regresiva con números grandes, separados como en el visor de la balanza
function Countdown({ seconds }: { seconds: number | null }) {
  const parts =
    seconds === null
      ? null
      : [
          Math.floor(seconds / 86400),
          Math.floor(seconds / 3600) % 24,
          Math.floor(seconds / 60) % 60,
          seconds % 60,
        ];
  const units = ["días", "horas", "min", "seg"];

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      {units.map((u, i) => (
        <div key={u} className="flex items-start gap-2 sm:gap-3">
          {i > 0 && (
            <span className={`${NARROW} text-5xl leading-none font-black text-white/40 sm:text-6xl`} aria-hidden>
              :
            </span>
          )}
          <div className="text-center">
            <span className={`${NARROW} block min-w-[2ch] text-5xl leading-none font-black tabular-nums sm:text-6xl`}>
              {parts ? String(parts[i]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1.5 block text-sm text-white/75">{u}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SpecialOffer() {
  const { offer, secondsLeft } = useActiveOffer();
  if (!offer) return null;

  const message = `¡Hola Supercarnes Néstor! Quiero reservar la oferta especial de ${offer.product.toLowerCase()} a $${pesos.format(offer.price)} ${offer.unit}.`;

  return (
    <section id="oferta" className="scroll-mt-16 overflow-hidden bg-carmesi text-white">
      <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="font-display text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl">
            Oferta especial
          </h2>
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
    </section>
  );
}
