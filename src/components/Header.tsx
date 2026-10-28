import { MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "#cortes", label: "Cortes" },
  { href: "#recetas", label: "Recetas" },
  { href: "#nosotros", label: "Nosotros" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-linea bg-azulejo/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* En mobile el logo grande ya está en el hero: acá alcanza con el nombre */}
        <a href="#" className="flex items-center gap-2.5">
          <Logo className="hidden h-11 w-auto sm:block" />
          <span className="font-display text-base font-extrabold whitespace-nowrap sm:text-xl">
            Supercarnes Néstor
          </span>
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden hover:text-carmesi sm:inline">
              {l.label}
            </a>
          ))}
          <a
            href="#sucursales"
            className="inline-flex items-center gap-1.5 rounded-full border border-tinta px-4 py-2 hover:border-carmesi hover:text-carmesi"
          >
            <MapPin size={16} aria-hidden />
            Sucursales
          </a>
        </nav>
      </div>
    </header>
  );
}
