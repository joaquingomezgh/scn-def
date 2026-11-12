import Logo from "@/components/Logo";
import SiteNav from "@/components/SiteNav";

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
        <SiteNav />
      </div>
    </header>
  );
}
