export default function Hero() {
  return (
    <section className="azulejos">
      <div className="toldo" aria-hidden />
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24">
        {/* El cartel sobre la pared de azulejos */}
        <div className="max-w-2xl border border-linea bg-azulejo p-6 sm:p-10">
          <h1 className="font-display max-w-[14ch] text-4xl leading-[1.05] font-extrabold sm:text-6xl">
            Carne fresca, cortada a la vista.
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
          </div>
        </div>
      </div>
    </section>
  );
}
