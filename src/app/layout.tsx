import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { SITE_URL } from "@/data/site";
import "./globals.css";

// Una sola familia: el eje de ancho separa títulos (expandido) de cuerpo (normal)
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  // El título y la descripción llevan lo que la gente escribe en Google: "carnicería" y la ciudad
  title: "Supercarnes Néstor | Carnicería en San Francisco, Frontera y Devoto",
  description:
    "Carnicería con 11 sucursales en San Francisco, Frontera y Devoto. Cortes del día a tu medida, encargos por WhatsApp, horarios y cómo llegar a cada local.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
