"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import QuickLinks from "@/components/QuickLinks";
import { useSections } from "@/components/sections";

// Menú de la barra fija. En escritorio, links de texto; en mobile, un botón que despliega
// los mismos azulejos del hero
export default function SiteNav() {
  const sections = useSections();
  const [open, setOpen] = useState(false);

  // Escape cierra el menú
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav aria-label="Principal" className="hidden items-center gap-6 text-sm font-medium lg:flex">
        {sections.map((s) => (
          <a key={s.href} href={s.href} className="hover:text-carmesi">
            {s.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-tinta px-4 py-2 text-sm font-medium hover:border-carmesi hover:text-carmesi focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-carmesi lg:hidden"
      >
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        {open ? "Cerrar" : "Menú"}
      </button>

      {open && (
        <div
          id="menu-mobile"
          className="azulejos absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-linea px-4 py-4 shadow-[0_12px_24px_rgb(43_34_32/0.12)] sm:px-6 lg:hidden"
        >
          <QuickLinks onNavigate={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
