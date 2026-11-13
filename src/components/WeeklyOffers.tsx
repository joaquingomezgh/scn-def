"use client";

import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import { NARROW, pesos } from "@/components/promoFormat";
import { whatsappLink } from "@/data/contact";
import { weeklyOffers as weekly, type WeeklyItem } from "@/data/weeklyOffers";

// Las cartulinas, en tonos de carne: cada una lleva el color de texto que se lee bien sobre ese fondo.
// El color y la inclinación salen de la posición, nunca de los datos.
// Este orden evita dos colores iguales pegados, tanto en filas de a 2 (celular) como de a 4 (escritorio)
const ROJO = "bg-carmesi text-white";
const BORDO = "bg-carmesi-oscuro text-white";
const ROSADO = "bg-carne-rosada text-tinta";
const SALMON = "bg-carne-salmon text-tinta";
const PAPERS = [ROJO, ROSADO, BORDO, SALMON, ROSADO, ROJO, SALMON, BORDO];
const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-[0.5deg]", "-rotate-[1.5deg]", "rotate-[1.5deg]"];

// Una cartulina pegada con cinta. Los tamaños van en cqw para que el precio entre en cualquier ancho de cartulina
function Paper({ item, index }: { item: WeeklyItem; index: number }) {
  return (
    <li
      className={`cartulina @container relative flex min-w-0 grow basis-[calc(50%-0.5rem)] flex-col px-3 pt-5 pb-3 shadow-[0_10px_20px_rgb(43_34_32/0.22)] transition-transform duration-300 sm:px-5 sm:pt-7 sm:pb-4 lg:basis-[calc(25%-1.25rem)] ${PAPERS[index % PAPERS.length]} ${TILTS[index % TILTS.length]}`}
    >
      {/* Cinta de papel que sostiene la cartulina en los azulejos */}
      <span
        className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 -rotate-2 bg-[#efe6cf]/85 shadow-[0_1px_2px_rgb(43_34_32/0.2)] sm:w-20"
        aria-hidden
      />

      {/* El corte recortado, como una calcomanía que flota sobre la cartulina. Cada uno arranca en otro
          momento del vaivén para que la pared no se mueva toda junta */}
      {item.image && (
        <div className="relative -mx-2 mt-1 mb-3 aspect-[4/3] sm:-mx-3">
          <span className="corte-sombra" style={{ animationDelay: `${index * -0.7}s` }} aria-hidden />
          <div className="corte-flota absolute inset-0" style={{ animationDelay: `${index * -0.7}s` }}>
            <div className="corte-pieza relative size-full">
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 50vw"
                className="corte-calco object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      )}

      <h4 className="font-display text-[min(11.5cqw,1.75rem)] leading-[1.1] font-extrabold hyphens-auto">
        {item.product}
      </h4>
      {item.note && <p className="mt-1.5 text-sm leading-snug opacity-80">{item.note}</p>}

      <p className="mt-auto flex items-start pt-4 font-black">
        <span className="mt-[0.3em] text-[min(13cqw,2rem)] leading-none">$</span>
        <span className={`${NARROW} text-[min(37cqw,5.5rem)] leading-[0.9] tabular-nums`}>
          {pesos.format(item.price)}
        </span>
      </p>
      <p className="mt-2 border-t-2 border-current pt-2 text-sm font-semibold sm:text-base">{item.unit}</p>
    </li>
  );
}

export default function WeeklyOffers() {
  if (!weekly) return null;

  return (
    <div id="ofertas-semana" className="scroll-mt-16">
      {/* El cartel blanco con el título */}
      <div className="border border-linea bg-azulejo p-6 sm:p-10">
        <h2 className="font-display text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl lg:text-7xl">
          {/* El corte va antes de "de la semana" para no partir la frase en un lugar raro */}
          Ofertas <br />
          de la semana
        </h2>
        <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-gris">{weekly.terms}</p>
      </div>

      {/* Las cartulinas crecen hasta llenar su fila: con 6 o con 7 la pared queda siempre completa */}
      <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-6 sm:mt-14 lg:gap-x-5 lg:gap-y-8">
        {weekly.items.map((item, i) => (
          <Paper key={item.product} item={item} index={i} />
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-3 sm:mt-14 sm:flex-row">
        <a
          href={whatsappLink("¡Hola Supercarnes Néstor! Quiero reservar de las ofertas de la semana: ")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-carmesi px-6 py-3.5 font-semibold text-white hover:bg-carmesi-oscuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi"
        >
          <MessageCircle size={20} aria-hidden />
          Reservar por WhatsApp
        </a>
        <a
          href="#sucursales"
          className="flex items-center justify-center gap-2 rounded-full border border-tinta bg-azulejo px-6 py-3.5 font-semibold hover:border-carmesi hover:text-carmesi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi"
        >
          <MapPin size={20} aria-hidden />
          Ver sucursales
        </a>
      </div>
    </div>
  );
}
