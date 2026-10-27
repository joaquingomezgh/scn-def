import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Una sola familia: el eje de ancho separa títulos (expandido) de cuerpo (normal)
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Supercarnes Néstor | Carne fresca, cortada a la vista",
  description:
    "Cortes del día y atención de mostrador en 11 sucursales. Encontrá la más cercana, su horario y cómo llegar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
