import Image from "next/image";

// Logo vectorizado a partir de public/logoscn.png: nítido a cualquier tamaño
export default function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/logo-scn.svg"
      alt="Néstor, carnes de primera calidad"
      width={1025}
      height={852}
      priority={priority}
      className={className}
    />
  );
}
