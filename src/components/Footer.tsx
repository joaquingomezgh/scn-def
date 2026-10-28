import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-linea">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-gris sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-4">
          <Logo className="h-16 w-auto" />
          <p>
            <span className="font-display font-extrabold text-tinta">Supercarnes Néstor</span>
            <br />
            Carne fresca, cortada a la vista.
          </p>
        </div>
        <p>© 2026 Supercarnes Néstor</p>
      </div>
    </footer>
  );
}
