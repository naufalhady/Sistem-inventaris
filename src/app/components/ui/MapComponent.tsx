// src/components/ui/MapComponent.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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
    readonly?: boolean;
}

export default function MapComponent({
    position,
    setPosition,
    readonly = false
}: MapComponentProps) {
    const [isClient, setIsClient] = useState(false);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        setIsClient(true);

        return () => {
            // Cleanup map instance
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Reset map reference when component unmounts
    useEffect(() => {
        return () => {
            mapRef.current = null;
        };
    }, []);

    if (!isClient) {
        return (
            <div className="h-64 w-full rounded-lg border bg-gray-100 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Loading map...</p>
            </div>
        );
    }

    return (
        <div className="relative z-0">
            <MapContainer
                center={position || [-6.2, 106.8]}
                zoom={12}
                scrollWheelZoom={true}
                className="h-64 w-full rounded-lg border"
                style={{ zIndex: 1 }}
                ref={mapRef}
                key={position ? `${position.lat}-${position.lng}` : 'default-map'}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {!readonly && <LocationMarker setPosition={setPosition} />}
                {position && <Marker position={position} />}
            </MapContainer>
        </div>
    );
}