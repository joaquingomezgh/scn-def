import { Leaf, Scale, ShieldCheck } from "lucide-react";

const items = [
  {
    Icon: Leaf,
    title: "Fresco todos los días",
    text: "Recibimos mercadería a diario y cortamos durante el día, no de una semana para la otra.",
  },
  {
    Icon: Scale,
    title: "Cortado a tu gusto",
    text: "Pedí el espesor, el peso y la preparación. Te lo cortamos y pesamos en el mostrador.",
  },
  {
    Icon: ShieldCheck,
    title: "Higiene a la vista",
    text: "Cámaras de frío controladas y mostradores y herramientas que se limpian en cada turno.",
  },
];

export default function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <h2 className="font-display max-w-[20ch] text-2xl font-bold sm:text-4xl">
        Lo que encontrás en el mostrador
      </h2>
      <ul className="mt-10 grid gap-8 sm:grid-cols-3">
        {items.map(({ Icon, title, text }) => (
          <li key={title} className="border-t border-linea pt-6">
            <Icon className="text-perejil" size={28} strokeWidth={1.75} aria-hidden />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 max-w-[38ch] leading-relaxed text-gris">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
