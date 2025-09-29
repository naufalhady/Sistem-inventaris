// src/components/ui/MapComponent.tsx

"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in Leaflet (Next.js/React)
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface LocationMarkerProps {
    setPosition: (pos: { lat: number; lng: number }) => void;
}

function LocationMarker({ setPosition }: LocationMarkerProps) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return null;
}

interface MapComponentProps {
    position: { lat: number; lng: number } | null;
    setPosition: (pos: { lat: number; lng: number }) => void;
}

export default function MapComponent({ position, setPosition }: MapComponentProps) {
    return (
        <MapContainer
            center={[-6.2, 106.8]} // default Jakarta
            zoom={12}
            scrollWheelZoom={true}
            className="h-64 w-full rounded-lg border"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker setPosition={setPosition} />
            {position && <Marker position={position}></Marker>}
        </MapContainer>
    );
}