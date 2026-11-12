import Logo from "@/components/Logo";
import { WHATSAPP_VISIBLE, whatsappLink } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="border-t border-linea">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-gris sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-4">
          <Logo className="h-16 w-auto" />
          <p>
            <span className="font-display font-extrabold text-tinta">Supercarnes Néstor</span>
            <br />
            Carnicería en San Francisco, Frontera y Devoto.
          </p>
        </div>
        {/* El teléfono escrito en texto: Google lo cruza con las fichas de Google Maps */}
        <p className="sm:text-right">
          WhatsApp de encargos:{" "}
          <a
            href={whatsappLink("¡Hola Supercarnes Néstor! ")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-tinta hover:text-carmesi"
          >
            {WHATSAPP_VISIBLE}
          </a>
          <br />© 2026 Supercarnes Néstor
        </p>
      </div>
    </footer>
  );
}
