import Logo from "@/components/Logo";

export default function Hero() {
  return (
    <section className="azulejos">
      <div className="toldo" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
        {/* El logo colgado en la pared, como el cartel de la entrada */}
        <Logo
          className="cartel-logo w-56 justify-self-center sm:w-72 lg:order-last lg:w-[26rem]"
          priority
        />

        {/* El cartel sobre la pared de azulejos */}
        <div className="max-w-2xl border border-linea bg-azulejo p-6 sm:p-10">
          <h1 className="font-display max-w-[14ch] text-4xl leading-[1.05] font-extrabold sm:text-6xl">
            Carnes de primera calidad.
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-gris">
            En nuestras 11 sucursales cortamos en el momento lo que te llevás, con el espesor y el
            peso que necesites.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#sucursales"
              className="rounded-full bg-carmesi px-6 py-3 text-center font-semibold text-white hover:bg-carmesi-oscuro"
            >
              Encontrá tu sucursal
            </a>
            <a
              href="#cortes"
              className="rounded-full border border-tinta px-6 py-3 text-center font-semibold hover:border-carmesi hover:text-carmesi"
            >
              Ver cortes
            </a>
            <a
              href="#recetas"
              className="rounded-full border border-tinta px-6 py-3 text-center font-semibold hover:border-carmesi hover:text-carmesi"
            >
              Recetas de la casa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
