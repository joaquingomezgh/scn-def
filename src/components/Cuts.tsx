import { Check, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/contact";

// Cortes agrupados por cómo se cocinan: así piensa el cliente en el mostrador.
// Es lo que se encuentra en una carnicería de barrio argentina: vaca, cerdo, pollo, achuras y embutidos
const groups = [
  {
    title: "Parrilla",
    cuts: [
      "Asado de tira",
      "Vacío",
      "Entraña",
      "Matambre",
      "Tapa de asado",
      "Matambre de cerdo",
      "Pechito de cerdo",
      "Pata y muslo de pollo",
    ],
  },
  {
    title: "Bifes y plancha",
    cuts: [
      "Bife de chorizo",
      "Ojo de bife",
      "Lomo",
      "Cuadril",
      "Bife ancho",
      "Solomillo de cerdo",
      "Suprema de pollo",
    ],
  },
  {
    title: "Horno",
    cuts: [
      "Colita de cuadril",
      "Peceto",
      "Tapa de nalga",
      "Bondiola",
      "Carré de cerdo",
      "Pernil de cerdo",
      "Pollo entero",
    ],
  },
  {
    title: "Milanesas",
    cuts: ["Nalga", "Cuadrada", "Bola de lomo", "Peceto", "Pechuga de pollo", "Lomo de cerdo"],
  },
  {
    title: "Guiso, olla y picada",
    cuts: [
      "Osobuco",
      "Roast beef",
      "Aguja",
      "Paleta",
      "Falda",
      "Carnaza",
      "Tortuguita",
      "Picada común y especial",
    ],
  },
  {
    title: "Achuras y embutidos",
    cuts: [
      "Chorizo",
      "Morcilla",
      "Salchicha parrillera",
      "Chinchulines",
      "Mollejas",
      "Riñón",
      "Hígado",
      "Mondongo",
      "Lengua",
    ],
  },
];

const services = ["Milanesas preparadas", "Hamburguesas caseras", "Pedidos para eventos"];

const askMessage = "¡Hola! Quería consultar si tienen ";

export default function Cuts() {
  return (
    <section id="cortes" className="scroll-mt-16 bg-marmol">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display max-w-[20ch] text-2xl font-bold sm:text-4xl">
          Qué llevar según lo que cocines
        </h2>
        <p className="mt-4 max-w-[52ch] leading-relaxed text-gris">
          Una guía rápida para el mostrador. Si no sabés qué corte pedir, contanos qué vas a
          preparar y te recomendamos.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="font-display border-b-2 border-carmesi pb-2 text-lg leading-tight font-bold sm:text-xl">
                {g.title}
              </h3>
              <ul className="mt-3 divide-y divide-linea">
                {g.cuts.map((c) => (
                  <li key={c} className="py-2.5 leading-snug">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-linea bg-azulejo p-6 sm:p-8">
          <h3 className="text-lg font-semibold">También preparamos</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <Check className="shrink-0 text-perejil" size={18} aria-hidden />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Lo que no está en la lista se consulta con la central, que sabe qué hay en cada sucursal */}
        <div className="mt-6 flex flex-col gap-5 border-2 border-perejil bg-azulejo p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h3 className="font-display text-xl leading-tight font-extrabold">
              ¿Buscás algo que no está en la lista?
            </h3>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-gris">
              Escribinos por WhatsApp y te decimos si lo tenemos y en qué sucursal. También
              cortamos a pedido: el espesor, el peso y la forma que necesites.
            </p>
          </div>
          <a
            href={whatsappLink(askMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-perejil px-6 py-3.5 font-semibold text-white hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-perejil"
          >
            <MessageCircle size={20} aria-hidden />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
