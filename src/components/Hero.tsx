import Logo from "@/components/Logo";
import QuickLinks from "@/components/QuickLinks";

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
            Somos una carnicería de San Francisco, Frontera y Devoto. En nuestras 11 sucursales
            cortamos en el momento lo que te llevás, con el espesor y el peso que necesites.
          </p>
        </div>

        {/* Los azulejos son la entrada a cada sección, en mobile y en escritorio */}
        <div className="lg:order-last lg:col-span-2">
          <QuickLinks />
        </div>
      </div>
    </section>
  );
}
