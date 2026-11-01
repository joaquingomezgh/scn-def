import { useSyncExternalStore } from "react";
import { offer } from "@/data/offer";
import { weeklyOffers } from "@/data/weeklyOffers";

// Reloj que avanza de a un segundo. En el servidor no hay hora: la cuenta arranca al cargar la página
const tick = (cb: () => void) => {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
};

// La promo mientras esté vigente, y los segundos que le quedan. Vencida, devuelve null y todo lo que
// la usa (sección y link del menú) desaparece sin tener que tocar el código
function useActive<T extends { endsAt: string }>(promo: T | null) {
  const now = useSyncExternalStore(
    tick,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
  if (!promo) return { promo: null, secondsLeft: null };

  const end = Math.floor(new Date(promo.endsAt).getTime() / 1000);
  if (now !== null && now >= end) return { promo: null, secondsLeft: null };
  return { promo, secondsLeft: now === null ? null : end - now };
}

export function useActiveOffer() {
  const { promo, secondsLeft } = useActive(offer);
  return { offer: promo, secondsLeft };
}

export function useActiveWeekly() {
  const { promo, secondsLeft } = useActive(weeklyOffers);
  return { weekly: promo, secondsLeft };
}
