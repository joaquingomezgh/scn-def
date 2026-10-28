// Fuente única de las sucursales.
// TODO: reemplazar estos datos de ejemplo por los reales (direcciones, horarios, teléfonos y coordenadas).

export type Branch = {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  mapsUrl: string;
};

// Ruta en Google Maps hasta el punto exacto del pin
const directions = (lat: number, lng: number) =>
  `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

const raw: Omit<Branch, "mapsUrl">[] = [
  { id: "centro", name: "Centro", address: "Av. San Martín 1240", city: "San Francisco", hours: "Lun a sáb 8 a 21 h y dom 8 a 13 h", phone: "0000 400-1001", lat: -31.4268, lng: -62.0835 },
  { id: "norte", name: "Barrio Norte", address: "Belgrano 862", city: "San Francisco", hours: "Lun a sáb 8 a 21 h", phone: "0000 400-1002", lat: -31.4165, lng: -62.087 },
  { id: "plaza", name: "Plaza", address: "Rivadavia 455", city: "San Francisco", hours: "Lun a sáb 8 a 20:30 h", phone: "0000 400-1003", lat: -31.429, lng: -62.08 },
  { id: "estacion", name: "Estación", address: "Mitre 2030", city: "San Francisco", hours: "Lun a sáb 8 a 21 h y dom 8 a 13 h", phone: "0000 400-1004", lat: -31.433, lng: -62.095 },
  { id: "parque", name: "Parque", address: "Av. del Parque 318", city: "San Francisco", hours: "Lun a sáb 8:30 a 20 h", phone: "0000 400-1005", lat: -31.44, lng: -62.078 },
  { id: "sur", name: "Zona Sur", address: "Moreno 1577", city: "San Francisco", hours: "Lun a sáb 8 a 21 h", phone: "0000 400-1006", lat: -31.445, lng: -62.088 },
  { id: "oeste", name: "Oeste", address: "Sarmiento 3301", city: "San Francisco", hours: "Lun a sáb 8 a 20 h", phone: "0000 400-1007", lat: -31.425, lng: -62.105 },
  { id: "jardin", name: "Jardín", address: "Las Heras 714", city: "San Francisco", hours: "Lun a sáb 8 a 20:30 h", phone: "0000 400-1009", lat: -31.42, lng: -62.075 },
  { id: "frontera", name: "Frontera", address: "Calle 3 n.º 90", city: "Frontera", hours: "Lun a dom 8 a 21 h", phone: "0000 400-1008", lat: -31.4305, lng: -62.0625 },
  { id: "freyre", name: "Freyre", address: "Bv. 25 de Mayo 902", city: "Freyre", hours: "Lun a sáb 8 a 21 h", phone: "0000 400-1011", lat: -31.164, lng: -62.0975 },
  { id: "devoto", name: "Devoto", address: "Bv. Libertad 450", city: "Devoto", hours: "Lun a dom 8 a 21 h", phone: "0000 400-1010", lat: -31.404, lng: -62.3065 },
];

export const branches: Branch[] = raw.map((b) => ({ ...b, mapsUrl: directions(b.lat, b.lng) }));
