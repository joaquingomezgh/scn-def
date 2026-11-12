import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";

// Datos estructurados de las preguntas: así buscadores y asistentes leen pregunta y respuesta
// sin tener que interpretar el diseño
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h2 className="font-display max-w-[18ch] text-2xl font-bold sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 max-w-[44ch] leading-relaxed text-gris">
            Lo que más nos preguntan en el mostrador. Si tu duda no está, escribinos por WhatsApp.
          </p>
        </div>

        {/* Las respuestas quedan en el HTML aunque estén cerradas: Google las lee igual */}
        <div className="divide-y divide-linea border-y border-linea">
          {faqs.map((f) => (
            <details key={f.question} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-lg font-semibold hover:text-carmesi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi [&::-webkit-details-marker]:hidden">
                <h3>{f.question}</h3>
                <Plus
                  size={22}
                  className="mt-0.5 shrink-0 text-carmesi transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden
                />
              </summary>
              <p className="max-w-[60ch] pb-6 leading-relaxed text-gris">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
