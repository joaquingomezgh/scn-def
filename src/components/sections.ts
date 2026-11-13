"use client";

import { Beef, Calculator, ChefHat, MapPin, Store, Tag, type LucideIcon } from "lucide-react";
import { useActiveOffer } from "@/components/useActiveOffer";
import { weeklyOffers } from "@/data/weeklyOffers";

export type Section = { href: string; label: string; hint: string; Icon: LucideIcon };

// Única lista de secciones, en el mismo orden en que aparecen en la página.
// La usan el menú de arriba y los azulejos del hero: si se agrega una sección, va solo acá
const all: Section[] = [
  { href: "#ofertas", label: "Ofertas", hint: "Las promos vigentes", Icon: Tag },
  { href: "#cortes", label: "Cortes", hint: "Qué llevar para cada comida", Icon: Beef },
  { href: "#recetas", label: "Recetas", hint: "Las de la casa", Icon: ChefHat },
  { href: "#asadometro", label: "Calculadora de asado", hint: "Cuánto llevar", Icon: Calculator },
  { href: "#nosotros", label: "Nosotros", hint: "Nuestra historia", Icon: Store },
  { href: "#sucursales", label: "Sucursales", hint: "Horarios y cómo llegar", Icon: MapPin },
];

// Ofertas aparece y se va con la misma regla que su sección
export function useSections() {
  const { offer } = useActiveOffer();
  return offer || weeklyOffers ? all : all.filter((s) => s.href !== "#ofertas");
}
