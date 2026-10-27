// Fuente única de las sucursales.
// TODO: reemplazar estos datos de ejemplo por los reales (direcciones, horarios, teléfonos y links de Maps).

export type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  mapsUrl: string;
};

const maps = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const raw: Omit<Branch, "mapsUrl">[] = [
  { id: "centro", name: "Centro", address: "Av. San Martín 1240", city: "Centro", hours: "Lun a sáb 8 a 21 h y dom 8 a 13 h", phone: "0000 400-1001" },
  { id: "norte", name: "Barrio Norte", address: "Belgrano 862", city: "Barrio Norte", hours: "Lun a sáb 8 a 21 h", phone: "0000 400-1002" },
  { id: "plaza", name: "Plaza", address: "Rivadavia 455", city: "Centro", hours: "Lun a sáb 8 a 20:30 h", phone: "0000 400-1003" },
  { id: "estacion", name: "Estación", address: "Mitre 2030", city: "Villa Estación", hours: "Lun a sáb 8 a 21 h y dom 8 a 13 h", phone: "0000 400-1004" },
  { id: "parque", name: "Parque", address: "Av. del Parque 318", city: "Los Pinos", hours: "Lun a sáb 8:30 a 20 h", phone: "0000 400-1005" },
  { id: "sur", name: "Zona Sur", address: "Moreno 1577", city: "Barrio Sur", hours: "Lun a sáb 8 a 21 h", phone: "0000 400-1006" },
  { id: "oeste", name: "Oeste", address: "Sarmiento 3301", city: "Villa Oeste", hours: "Lun a sáb 8 a 20 h", phone: "0000 400-1007" },
  { id: "rio", name: "Costanera", address: "Av. Costanera 90", city: "La Ribera", hours: "Lun a dom 8 a 21 h", phone: "0000 400-1008" },
  { id: "jardin", name: "Jardín", address: "Las Heras 714", city: "Jardín", hours: "Lun a sáb 8 a 20:30 h", phone: "0000 400-1009" },
  { id: "ruta", name: "Ruta", address: "Ruta 5 km 3,5", city: "Acceso Este", hours: "Lun a dom 8 a 21 h", phone: "0000 400-1010" },
  { id: "universidad", name: "Universidad", address: "Pellegrini 1902", city: "Barrio Universitario", hours: "Lun a sáb 8 a 21 h", phone: "0000 400-1011" },
];

export const branches: Branch[] = raw.map((b) => ({
  ...b,
  mapsUrl: maps(`Supercarnes Néstor ${b.address} ${b.city}`),
}));
