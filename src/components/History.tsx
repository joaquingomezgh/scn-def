// TODO: reemplazar por la historia real de la marca (fundación, primeras sucursales, etc.)
export default function History() {
  return (
    <section id="historia" className="scroll-mt-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <h2 className="font-display max-w-[18ch] text-2xl font-bold sm:text-4xl">
          Una carnicería de barrio que creció con sus vecinos
        </h2>
        <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-gris">
          <p>
            Supercarnes Néstor empezó como un mostrador atendido por su dueño, que conocía a cada
            cliente por su nombre y sabía qué corte llevaba para el domingo.
          </p>
          <p>
            Hoy somos 11 sucursales, pero seguimos trabajando igual: carne elegida todos los días,
            carniceros que te asesoran y un local limpio en el que da gusto comprar.
          </p>
        </div>
      </div>
    </section>
  );
}
