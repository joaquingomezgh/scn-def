"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus } from "lucide-react";
import { calcAsado, formatKg, PLANS, type AsadoInput, type Line, type PlanId } from "@/data/asado";
import { whatsappLink } from "@/data/contact";

const diners = [
  { key: "men", label: "Hombres", one: "un hombre", hint: "500 g c/u" },
  { key: "women", label: "Mujeres", one: "una mujer", hint: "400 g c/u" },
  { key: "kids", label: "Niños", one: "un niño", hint: "250 g c/u" },
] as const;

const appetites = [
  { id: "liviano", label: "Poco" },
  { id: "normal", label: "Normal" },
  { id: "asadero", label: "Mucho" },
] as const;

// Las tres propuestas son recomendaciones; "A mi gusto" deja que el cliente escriba su pedido
type Pick = PlanId | "manual";
const picks: { id: Pick; label: string }[] = [...PLANS, { id: "manual", label: "A mi gusto" }];

const MAX = 40;
const RANGES = [5, 10, 20, 40, 80];

// Botonera de opciones, con el mismo estilo que el selector Lista/Mapa de sucursales
function Choice<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend?: string;
  options: readonly { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      {legend && <legend className="mb-3 font-semibold">{legend}</legend>}
      <div
        className="grid gap-1 rounded-3xl border border-linea bg-marmol p-1"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className="min-h-12 rounded-3xl px-3 py-2 text-sm leading-tight font-semibold text-gris transition-colors hover:text-tinta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi aria-pressed:bg-carmesi aria-pressed:text-white sm:text-base"
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// Balanza de reloj del mostrador: la aguja marca los kilos totales
function Dial({ total }: { total: number }) {
  const range = RANGES.find((r) => r >= total) ?? RANGES.at(-1)!;
  const turn = Math.min(total / range, 1) * 180 - 90;
  const at = (t: number, r: number) => {
    const a = Math.PI * (1 - t);
    // Redondeado para que el servidor y el navegador generen el mismo SVG
    return [120 + r * Math.cos(a), 128 - r * Math.sin(a)].map((n) => Math.round(n * 100) / 100);
  };

  return (
    <svg viewBox="0 0 240 144" className="mx-auto w-full max-w-xs" aria-hidden>
      <path
        d="M8 128 A112 112 0 0 1 232 128 V140 H8 Z"
        className="fill-azulejo stroke-tinta"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {Array.from({ length: 51 }, (_, i) => {
        const major = i % 10 === 0;
        const [x1, y1] = at(i / 50, 102);
        const [x2, y2] = at(i / 50, major ? 88 : i % 5 === 0 ? 93 : 96);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            className="stroke-tinta"
            strokeWidth={major ? 2.5 : 1}
          />
        );
      })}
      {[0, 1, 2, 3, 4, 5].map((n) => {
        const [x, y] = at(n / 5, 74);
        return (
          <text
            key={n}
            x={x}
            y={y + 4}
            textAnchor="middle"
            className="fill-gris text-[12px] font-semibold tabular-nums"
          >
            {(range / 5) * n}
          </text>
        );
      })}
      <text x="120" y="100" textAnchor="middle" className="fill-gris text-[11px]">
        kg
      </text>
      <path
        d="M117.5 128 L120 34 L122.5 128 Z"
        className="fill-carmesi transition-transform duration-700 ease-[cubic-bezier(0.3,1.4,0.5,1)] motion-reduce:transition-none"
        style={{ transform: `rotate(${turn}deg)`, transformOrigin: "120px 128px" }}
      />
      <circle cx="120" cy="128" r="8" className="fill-tinta" />
      <circle cx="120" cy="128" r="2.5" className="fill-azulejo" />
    </svg>
  );
}

// Renglones del ticket con puntos guía hasta la cantidad
function TicketLines({ lines }: { lines: Line[] }) {
  return (
    <div className="border-y border-dashed border-gris/40 py-4">
      <dl className="space-y-2">
        {lines.map((l) => (
          <div key={l.label} className="flex items-baseline gap-2">
            <dt>{l.label}</dt>
            <span className="flex-1 translate-y-[-0.25em] border-b-2 border-dotted border-gris/30" aria-hidden />
            <dd className="font-semibold whitespace-nowrap tabular-nums">{l.amount}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// Vista previa del chat para "A mi gusto": el primer mensaje sale solo y el pedido va en otro aparte
function ManualSteps({ message }: { message: string }) {
  return (
    <ol className="mt-6 space-y-4 border-t border-dashed border-gris/40 pt-5">
      <li>
        <p className="text-sm font-semibold">1. Mandás este mensaje</p>
        <p className="mt-2 ml-auto max-w-[34ch] rounded-2xl rounded-tr-sm bg-perejil/12 px-4 py-3 text-[0.95rem] leading-snug">
          {message}
        </p>
      </li>
      <li>
        <p className="text-sm font-semibold">2. Abajo, en otro mensaje, escribís tu pedido</p>
        <div className="mt-2 ml-auto max-w-[34ch] rounded-2xl rounded-tr-sm border-2 border-dashed border-perejil/50 px-4 py-3 text-[0.95rem] leading-snug">
          <p className="text-sm text-gris">Por ejemplo:</p>
          <p className="mt-1">
            2 kg de vacío
            <br />1 kg de entraña
            <br />6 chorizos y 3 morcillas
          </p>
        </div>
      </li>
    </ol>
  );
}

export default function Asadometro() {
  const [input, setInput] = useState<AsadoInput>({
    men: 3,
    women: 3,
    kids: 2,
    appetite: "normal",
  });
  const [pick, setPick] = useState<Pick>("clasico");
  const set = (patch: Partial<AsadoInput>) => setInput((prev) => ({ ...prev, ...patch }));

  const manual = pick === "manual";
  const r = calcAsado(input, manual ? "clasico" : pick);
  const total = Math.round(r.total * 10) / 10;

  // Pedido corto para la central de encargos, que después indica en qué sucursal retirarlo.
  // A mi gusto: el cliente avisa y manda los cortes en un mensaje aparte
  const forWhom = `${r.people} ${r.people === 1 ? "persona" : "personas"}`;
  const message = manual
    ? `¡Hola! Quiero encargar un asado para ${forWhom}, armado a mi gusto. Les paso los cortes en el próximo mensaje.`
    : [
        `¡Hola! Quiero encargar el asado ${r.plan.label.toLowerCase()} para ${forWhom}:`,
        ...r.lines.map((l) => `• ${l.label}: ${l.amount}`),
      ].join("\n");

  return (
    <section id="asadometro" className="scroll-mt-16 bg-marmol">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-[2.5rem] leading-[1.02] font-extrabold sm:text-6xl">
          Calculadora de asado
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-gris">
          Decinos cuántos son y te recomendamos qué llevar. Encargá una propuesta tal cual o armá
          el asado a tu gusto por WhatsApp.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* La balanza va primero en mobile para ver cómo se mueve la aguja al sumar gente */}
          <div className="border border-linea bg-azulejo px-5 pt-6 pb-5 text-center lg:col-start-2">
            <Dial total={r.total} />
            <p className="font-display mt-3 text-5xl font-extrabold tabular-nums" aria-live="polite">
              {formatKg(total)} kg
            </p>
            <p className="mt-1 text-gris">
              {r.people === 0
                ? "Sumá al menos una persona"
                : `de carne para ${r.people} ${r.people === 1 ? "persona" : "personas"}`}
            </p>
          </div>

          <div className="space-y-8 border border-linea bg-azulejo p-5 sm:p-7 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <fieldset>
              <legend className="font-semibold">¿Cuántos son?</legend>
              <ul className="mt-2 divide-y divide-linea">
                {diners.map((d) => {
                  const n = input[d.key];
                  return (
                    <li key={d.key} className="flex items-center justify-between gap-4 py-3">
                      <div>
                        <p className="text-lg font-semibold">{d.label}</p>
                        <p className="text-sm text-gris">{d.hint}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label={`Quitar ${d.one}`}
                          disabled={n === 0}
                          onClick={() => set({ [d.key]: n - 1 })}
                          className="grid size-12 place-items-center rounded-full border border-linea hover:border-carmesi hover:text-carmesi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi disabled:opacity-35 disabled:hover:border-linea disabled:hover:text-tinta"
                        >
                          <Minus size={20} aria-hidden />
                        </button>
                        <output
                          aria-label={d.label}
                          className="font-display w-12 text-center text-2xl font-extrabold tabular-nums"
                        >
                          {n}
                        </output>
                        <button
                          type="button"
                          aria-label={`Sumar ${d.one}`}
                          disabled={n === MAX}
                          onClick={() => set({ [d.key]: n + 1 })}
                          className="grid size-12 place-items-center rounded-full bg-carmesi text-white hover:bg-carmesi-oscuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi disabled:opacity-35"
                        >
                          <Plus size={20} aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <Choice
              legend="¿Cuánto comen?"
              options={appetites}
              value={input.appetite}
              onChange={(appetite) => set({ appetite })}
            />
          </div>

          {/* Ticket de mostrador con el detalle de la recomendación */}
          <div className="border border-linea bg-azulejo p-5 sm:p-7 lg:col-start-2">
            {r.people === 0 ? (
              <p className="text-gris">
                Sumá al menos una persona con los botones + para ver qué llevar.
              </p>
            ) : (
              <>
                <h3 className="font-display text-xl font-extrabold">¿Qué llevás?</h3>
                <div className="mt-4">
                  <Choice options={picks} value={pick} onChange={setPick} />
                </div>
                <p className="mt-4 text-gris" aria-live="polite">
                  {manual ? "Vos elegís los cortes y cuánto de cada uno." : r.plan.description}
                </p>
                <div className="mt-4">
                  <TicketLines
                    lines={
                      manual
                        ? [
                            { label: "Carne en total", amount: `${formatKg(total)} kg` },
                            ...r.lines.filter((l) => l.label === "Carbón"),
                          ]
                        : r.lines
                    }
                  />
                </div>
                <p className="mt-4 text-sm text-gris">
                  {manual ? (
                    "El total es una referencia para que no te quedes corto."
                  ) : (
                    <>
                      Son recomendaciones. ¿Preferís otros cortes u otras cantidades?{" "}
                      <button
                        type="button"
                        onClick={() => setPick("manual")}
                        className="font-semibold text-carmesi underline underline-offset-2 hover:text-carmesi-oscuro focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi"
                      >
                        Armalo a tu gusto
                      </button>
                    </>
                  )}
                </p>
                {manual && <ManualSteps message={message} />}
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 rounded-full bg-perejil px-5 py-4 text-base font-semibold text-white hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-perejil sm:text-lg"
                >
                  <MessageCircle size={22} aria-hidden />
                  Encargar por WhatsApp
                </a>
                <p className="mt-3 text-center text-sm text-gris">
                  {manual
                    ? "La central te confirma y te dice en qué sucursal retirarlo."
                    : "El pedido llega a nuestra central de encargos, que te confirma y te dice en qué sucursal retirarlo."}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
