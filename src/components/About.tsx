import CowChart from "@/components/CowChart";

// TODO: reemplazar por la historia real de la marca (años, sucursales, hitos)
const milestones = [
  { year: "1987", text: "Néstor abre su primer mostrador en el Centro, con una sierra, una balanza y clientes del barrio." },
  { year: "1999", text: "Se suma la familia y abrimos la segunda sucursal, en Barrio Norte." },
  { year: "2012", text: "Instalamos cámara de maduración propia y empezamos con los cortes premium." },
  { year: "Hoy", text: "Somos 11 sucursales y seguimos eligiendo la carne con el mismo criterio." },
];

// TODO: confirmar con la marca qué ofrece realmente en su línea premium
const premium = [
  {
    title: "Hacienda elegida en origen",
    text: "Compramos a productores que conocemos y revisamos cada media res antes de que llegue al local.",
  },
  {
    title: "Maduración en cámara",
    text: "Los cortes premium descansan en frío los días necesarios para ganar terneza y sabor.",
  },
  {
    title: "Cortes especiales a pedido",
    text: "Tomahawk, ojo de bife grueso o entraña limpia. Encargalos y te los tenemos listos.",
  },
];

export default function About() {
  return (
    <section id="nosotros" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 className="font-display max-w-[18ch] text-2xl font-bold sm:text-4xl">
              Una carnicería de barrio que creció con sus vecinos
            </h2>
            <div className="mt-6 max-w-[52ch] space-y-5 text-lg leading-relaxed text-gris">
              <p>
                Supercarnes Néstor empezó como un mostrador atendido por su dueño, que conocía a
                cada cliente por su nombre y sabía qué corte llevaba para el domingo.
              </p>
              <p>
                La vaca dibujada en nuestro cartel viene de esa época: Néstor quería que se
                supiera que acá se trabaja el animal entero, con oficio, y no cajas de cortes
                sueltos.
              </p>
            </div>
          </div>

          {/* Una línea de tiempo: acá los años sí son una secuencia */}
          <ol className="divide-y divide-linea border-y border-linea">
            {milestones.map((m) => (
              <li key={m.year} className="grid grid-cols-[5rem_1fr] gap-4 py-5 sm:grid-cols-[7rem_1fr]">
                <span className="font-display text-xl font-extrabold text-carmesi sm:text-2xl">
                  {m.year}
                </span>
                <p className="leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* El cartel de cortes: la vaca como símbolo de la casa */}
        <div className="mt-16 bg-carmesi p-6 text-white sm:mt-24 sm:p-10 lg:p-14">
          <h3 className="font-display max-w-[22ch] text-2xl font-bold sm:text-4xl">
            Conocemos la vaca de punta a punta
          </h3>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-white/85">
            Cada sucursal recibe medias reses, no cortes envasados. Por eso podemos recomendarte
            qué parte llevar, cortarla a tu medida y tener los cortes premium que no se consiguen
            en la góndola.
          </p>

          <div className="mt-10">
            <CowChart />
          </div>

          <ul className="mt-12 grid gap-8 border-t border-white/30 pt-8 sm:grid-cols-3">
            {premium.map((p) => (
              <li key={p.title}>
                <h4 className="text-lg font-semibold">{p.title}</h4>
                <p className="mt-2 max-w-[38ch] leading-relaxed text-white/85">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
