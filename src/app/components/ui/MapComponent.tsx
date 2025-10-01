// components/ui/MapComponent.tsx
"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
    position: { lat: number; lng: number } | null;
    endPosition?: { lat: number; lng: number } | null;
    isLine?: boolean;
}

export default function MapComponent({
    position,
    endPosition,
    isLine = false
}: MapComponentProps) {
    const mapRef = useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const endMarkerRef = useRef<L.Marker | null>(null);
    const lineRef = useRef<L.Polyline | null>(null);
    const routeLineRef = useRef<L.Polyline | null>(null);

    // Function to get route from OSRM API
    const getRoute = async (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
        try {
            const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
            );

            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates.map((coord: [number, number]) =>
                    [coord[1], coord[0]] // Convert from [lng, lat] to [lat, lng]
                );

                return coordinates;
            }
        } catch (error) {
            console.error('Error fetching route:', error);
        }

        return null;
    };

    // Draw route on map
    const drawRoute = async (start: { lat: number; lng: number }, end: { lat: number; lng: number }) => {
        if (!mapRef.current) return;

        // Clear existing route
        if (routeLineRef.current) {
            routeLineRef.current.remove();
        }
        if (lineRef.current) {
            lineRef.current.remove();
        }

        // Get curved route from OSRM
        const routeCoordinates = await getRoute(start, end);

        if (routeCoordinates) {
            // Draw curved route following roads (GARIS BIRU LENGKUNG)
            routeLineRef.current = L.polyline(routeCoordinates, {
                color: '#3b82f6',
                weight: 6,
                opacity: 0.8,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(mapRef.current);

            // Also draw straight dashed line as reference (GARIS PUTUS-PUTUS)
            lineRef.current = L.polyline([
                [start.lat, start.lng],
                [end.lat, end.lng]
            ], {
                color: '#ef4444',
                weight: 2,
                opacity: 0.5,
                dashArray: '5, 5'
            }).addTo(mapRef.current);
        } else {
            // Fallback to straight line if routing fails
            lineRef.current = L.polyline([
                [start.lat, start.lng],
                [end.lat, end.lng]
            ], {
                color: '#3b82f6',
                weight: 4,
                opacity: 0.8
            }).addTo(mapRef.current);
        }
    };

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize map
            mapRef.current = L.map('map').setView([-7.2264993, 112.7217274], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapRef.current);

            // TIDAK ADA CLICK EVENT LISTENER - MAP VIEW ONLY
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update markers and line berdasarkan koordinat yang diinput
    useEffect(() => {
        if (!mapRef.current) return;

        // Clear existing markers and lines
        if (markerRef.current) {
            markerRef.current.remove();
        }
        if (endMarkerRef.current) {
            endMarkerRef.current.remove();
        }
        if (lineRef.current) {
            lineRef.current.remove();
        }
        if (routeLineRef.current) {
            routeLineRef.current.remove();
        }

        // Add start marker jika position ada
        if (position) {
            const popupText = isLine ? 'Start Position' : 'Position';
            markerRef.current = L.marker([position.lat, position.lng])
                .addTo(mapRef.current)
                .bindPopup(popupText)
                .openPopup();

            // Center map ke position
            mapRef.current.setView([position.lat, position.lng], 15);
        }

        // Add end marker and route untuk tipe line
        if (isLine && endPosition && position) {
            endMarkerRef.current = L.marker([endPosition.lat, endPosition.lng])
                .addTo(mapRef.current)
                .bindPopup('End Position')
                .openPopup();

            // Draw route yang mengikuti jalan
            drawRoute(position, endPosition);

            // Fit bounds untuk menampilkan kedua marker
            const bounds = L.latLngBounds([position, endPosition]);
            mapRef.current.fitBounds(bounds, { padding: [20, 20] });
        } else if (position) {
            // Jika hanya position saja, center ke position
            mapRef.current.setView([position.lat, position.lng], 15);
        }
    }, [position, endPosition, isLine]);

    return (
        <div
            id="map"
            className="h-64 w-full rounded-lg border border-gray-300"
        />
    );
}