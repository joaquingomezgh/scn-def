// Fuente única de las sucursales: 11 locales en San Francisco, Frontera y Devoto.

export type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

// Ruta en Google Maps hasta el punto exacto del pin
const directions = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

// Horario común a toda la red.
// Si alguna sucursal llega a tener otro horario, ponérselo aparte.
export const HORARIO = "7:30 a 13 h y 17:30 a 21 h";

// Coordenadas tomadas de OpenStreetMap: la esquina exacta o la altura de la calle.
const raw: Omit<Branch, "mapsUrl">[] = [
  // San Francisco (Córdoba)
  { id: "1-de-mayo", name: "1° de Mayo", address: "1° de Mayo y Bv. Sáenz Peña", city: "San Francisco", hours: HORARIO, lat: -31.4372, lng: -62.07644 },
  { id: "saenz-pena", name: "Sáenz Peña", address: "Bv. Sáenz Peña 2157", city: "San Francisco", hours: HORARIO, lat: -31.43485, lng: -62.09122 },
  { id: "garibaldi", name: "Garibaldi", address: "Av. Garibaldi y La Madrid", city: "San Francisco", hours: HORARIO, lat: -31.42142, lng: -62.07628 },
  { id: "libertador", name: "Libertador Norte", address: "Av. Libertador Norte 1200", city: "San Francisco", hours: HORARIO, lat: -31.41873, lng: -62.08247 },
  { id: "liniers", name: "Liniers", address: "Liniers y Av. 9 de Septiembre", city: "San Francisco", hours: HORARIO, lat: -31.4414, lng: -62.0764 },
  { id: "caseros", name: "Caseros", address: "Caseros y 9 de Julio", city: "San Francisco", hours: HORARIO, lat: -31.42932, lng: -62.09723 },
  { id: "rivadavia", name: "Rivadavia", address: "Antártida Argentina y Rivadavia", city: "San Francisco", hours: HORARIO, lat: -31.44409, lng: -62.08948 },
  // Frontera (Santa Fe): calles numeradas
  { id: "calle-70", name: "Calle 70", address: "Calle 1 y Calle 70", city: "Frontera", hours: HORARIO, lat: -31.42962, lng: -62.06561 },
  { id: "calle-110", name: "Calle 110", address: "Calle 1 y Calle 110", city: "Frontera", hours: HORARIO, lat: -31.44566, lng: -62.07001 },
  { id: "calle-100", name: "Calle 100", address: "Calle 100 n.º 395", city: "Frontera", hours: HORARIO, lat: -31.4413, lng: -62.0647 },
  // Devoto (Córdoba)
  { id: "devoto", name: "Devoto", address: "Bv. San Martín 244", city: "Devoto", hours: HORARIO, lat: -31.40403, lng: -62.30616 },
];

export const branches: Branch[] = raw.map((b) => ({ ...b, mapsUrl: directions(b.lat, b.lng) }));
