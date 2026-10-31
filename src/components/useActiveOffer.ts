import { useSyncExternalStore } from "react";
import { offer } from "@/data/offer";

// Reloj que avanza de a un segundo. En el servidor no hay hora: la cuenta arranca al cargar la página
const tick = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};

// La oferta mientras esté vigente, y los segundos que le quedan. Vencida, devuelve null y todo lo que
// la usa (sección y link del menú) desaparece sin tener que tocar el código
export function useActiveOffer() {
  const now = useSyncExternalStore(
    tick,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
  if (!offer) return { offer: null, secondsLeft: null };

  const end = Math.floor(new Date(offer.endsAt).getTime() / 1000);
  if (now !== null && now >= end) return { offer: null, secondsLeft: null };
  return { offer, secondsLeft: now === null ? null : end - now };
}
