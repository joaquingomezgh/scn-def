import CowChart from "@/components/CowChart";

// Datos firmes: unos 30 años en el rubro (empezó en Frontera), 11 sucursales, 3 ciudades y Caseros abierta en 2024
const stats = [
  { value: "30", label: "años en el rubro" },
  { value: "11", label: "sucursales" },
  { value: "3", label: "ciudades" },
];

const milestones = [
  { year: "2000s", text: "Néstor abre su primer mostrador en Frontera, con una sierra, una balanza y los vecinos de la cuadra como clientes." },
  { year: "2010s", text: "Se suma la familia, cruzamos a San Francisco y la carnicería se multiplica por sus barrios. Después llegamos a Devoto, siempre con el mismo criterio para elegir la carne." },
  { year: "2024", text: "Abrimos Caseros y 9 de Julio, la más nueva. Hoy somos 11 sucursales en 3 ciudades." },
];

const premium = [
  {
    title: "Hacienda elegida en origen",
    text: "Compramos a productores que conocemos y revisamos cada media res antes de que llegue al local.",
  },
  {
    title: "Frío de punta a punta",
    text: "La carne viaja y descansa en cámara a temperatura controlada, del frigorífico a tu mostrador.",
  },
  {
    title: "Cortes especiales a pedido",
    text: "Ojo de bife grueso, entraña limpia o matambre pelado. Encargalos y te los tenemos listos.",
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
                Hace unos 30 años, Supercarnes Néstor empezó en Frontera como un mostrador atendido
                por su dueño, que conocía a cada cliente por su nombre y sabía qué corte llevaba
                para el domingo.
              </p>
              <p>
                Hoy estamos en Frontera, San Francisco y Devoto, y seguimos trabajando igual: el
                animal entero, cortado en el momento y con gente de oficio del otro lado del
                mostrador. La vaca de nuestro cartel está ahí para recordarlo.
              </p>
            </div>

            {/* Las cifras de la casa, a la vista */}
            <dl className="mt-8 grid max-w-md grid-cols-3 border-y border-linea">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col py-5 not-first:border-l not-first:border-linea not-first:pl-4">
                  <dt className="text-sm text-gris">{s.label}</dt>
                  <dd className="font-display -order-1 text-3xl font-extrabold text-carmesi sm:text-4xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
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
