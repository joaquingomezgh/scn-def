import { NARROW } from "@/components/promoFormat";

// Cuenta regresiva con números grandes, separados como en el visor de la balanza. Toma el color del texto de afuera
export default function Countdown({ seconds }: { seconds: number | null }) {
  const parts =
    seconds === null
      ? null
      : [
          Math.floor(seconds / 86400),
          Math.floor(seconds / 3600) % 24,
          Math.floor(seconds / 60) % 60,
          seconds % 60,
        ];
  const units = ["días", "horas", "min", "seg"];

  return (
    <div className="flex items-start gap-2 sm:gap-3">
      {units.map((u, i) => (
        <div key={u} className="flex items-start gap-2 sm:gap-3">
          {i > 0 && (
            <span className={`${NARROW} text-5xl leading-none font-black opacity-40 sm:text-6xl`} aria-hidden>
              :
            </span>
          )}
          <div className="text-center">
            <span className={`${NARROW} block min-w-[2ch] text-5xl leading-none font-black tabular-nums sm:text-6xl`}>
              {parts ? String(parts[i]).padStart(2, "0") : "--"}
            </span>
            <span className="mt-1.5 block text-sm opacity-75">{u}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
