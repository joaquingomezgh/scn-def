"use client";

import "leaflet/dist/leaflet.css";
import { divIcon, latLngBounds } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MapPin } from "lucide-react";
import { branches, type Branch } from "@/data/branches";

// Pin propio en SVG: los íconos por defecto de Leaflet son azules y se rompen con el bundler
const pin = divIcon({
  className: "",
  html: `<svg width="30" height="40" viewBox="0 0 30 40" aria-hidden="true"><path d="M15 39s13-13.4 13-23.5C28 7.5 22.2 1 15 1S2 7.5 2 15.5C2 25.6 15 39 15 39z" fill="#a3162e" stroke="#fff" stroke-width="2"/><circle cx="15" cy="15" r="5" fill="#fff"/></svg>`,
  iconSize: [30, 40],
  iconAnchor: [15, 39],
  popupAnchor: [0, -36],
});

// Encuadre fijo con todas las sucursales (San Francisco, Frontera, Freyre, Devoto)
const zone = latLngBounds(branches.map((b) => [b.lat, b.lng]));

export default function BranchMap({ items }: { items: Branch[] }) {
  return (
    <div className="isolate border border-linea">
      <MapContainer
        bounds={zone}
        boundsOptions={{ padding: [40, 40] }}
        scrollWheelZoom={false}
        className="h-[440px] w-full sm:h-[560px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map((b) => (
          <Marker key={b.id} position={[b.lat, b.lng]} icon={pin} title={`${b.name}, ${b.city}`}>
            <Popup>
              <div className="min-w-48">
                <div className="text-base font-semibold text-tinta">{b.name}</div>
                <div className="text-sm text-gris">{b.city}</div>
                <div className="mt-2 text-sm text-tinta">{b.address}</div>
                <a
                  href={b.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-carmesi px-4 py-2 text-sm font-medium text-white! hover:bg-carmesi-oscuro"
                >
                  <MapPin size={16} aria-hidden />
                  Cómo llegar
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
