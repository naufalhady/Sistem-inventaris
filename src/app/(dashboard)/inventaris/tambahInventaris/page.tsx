"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Navigation, MapPin, Ruler } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import untuk Map Component (disable SSR)
const MapComponent = dynamic(() => import("../../../components/ui/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-64 w-full rounded-lg border bg-gray-100 animate-pulse flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
        </div>
    ),
});

export default function EditInventoryPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        condition: "Baik",
        description: "",
        installedDate: "",
        lastMaintenance: "",
        inventoryType: "point", // "point" atau "line"
    });

    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [endPosition, setEndPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [manualCoords, setManualCoords] = useState({
        startLat: "-7.2264993",
        startLng: "112.7217274",
        endLat: "",
        endLng: "",
    });
    const [length, setLength] = useState("");

    // Calculate distance between two coordinates in meters
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    // Auto-update position ketika manualCoords berubah
    useEffect(() => {
        if (manualCoords.startLat && manualCoords.startLng) {
            const lat = parseFloat(manualCoords.startLat);
            const lng = parseFloat(manualCoords.startLng);
            if (!isNaN(lat) && !isNaN(lng)) {
                setPosition({ lat, lng });
            }
        }
    }, [manualCoords.startLat, manualCoords.startLng]);

    // Auto-update endPosition dan hitung panjang untuk tipe line
    useEffect(() => {
        if (formData.inventoryType === "line" && manualCoords.endLat && manualCoords.endLng) {
            const lat = parseFloat(manualCoords.endLat);
            const lng = parseFloat(manualCoords.endLng);
            if (!isNaN(lat) && !isNaN(lng)) {
                setEndPosition({ lat, lng });

                // Hitung panjang otomatis ketika ada start dan end position
                if (position) {
                    const distance = calculateDistance(
                        position.lat, position.lng,
                        lat, lng
                    );
                    setLength(distance.toFixed(2));
                }
            }
        }
    }, [manualCoords.endLat, manualCoords.endLng, formData.inventoryType, position]);

    // Calculate end position from length (untuk input manual panjang)
    const calculateEndPosition = (startLat: number, startLng: number, lengthMeters: number) => {
        // Approximate conversion: 1 degree latitude = 111.32 km
        // 1 degree longitude = 111.32 km * cos(latitude)
        const latChange = (lengthMeters / 1000) / 111.32;
        const lngChange = (lengthMeters / 1000) / (111.32 * Math.cos(startLat * Math.PI / 180));

        return {
            lat: startLat + latChange,
            lng: startLng + lngChange
        };
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleManualCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setManualCoords((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLength(value);

        // Auto-calculate end position jika start position ada dan panjang diinput
        if (value && position) {
            const lengthMeters = parseFloat(value);
            if (!isNaN(lengthMeters)) {
                const endPos = calculateEndPosition(position.lat, position.lng, lengthMeters);
                setEndPosition(endPos);
                setManualCoords(prev => ({
                    ...prev,
                    endLat: endPos.lat.toFixed(7),
                    endLng: endPos.lng.toFixed(7)
                }));
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!position) {
            alert("Silakan masukkan koordinat lokasi.");
            return;
        }

        if (formData.inventoryType === "line" && !endPosition) {
            alert("Silakan tentukan koordinat akhir untuk rambu jalan.");
            return;
        }

        const newData = {
            ...formData,
            position,
            endPosition: formData.inventoryType === "line" ? endPosition : undefined,
            length: formData.inventoryType === "line" ? length : undefined,
            manualCoords
        };

        console.log("Data Inventaris Baru:", newData);

        // TODO: Simpan ke API / state global
        router.push("/dashboard");
    };

    // Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Tambah Inventaris
                </h3>
                <p className="text-gray-600">
                    Lengkapi informasi inventaris di bawah ini
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informasi Umum */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Informasi Umum
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Nama Inventaris */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Nama Inventaris
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Contoh: Lampu Jalan, Guardrail, Rambu Lalu Lintas"
                            />
                        </div>

                        {/* Tipe Inventaris */}
                        <div>
                            <label
                                htmlFor="inventoryType"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tipe Inventaris
                            </label>
                            <select
                                id="inventoryType"
                                name="inventoryType"
                                value={formData.inventoryType}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="point">Titik (Lampu, Rambu, CCTV)</option>
                                <option value="line">Garis (Guardrail, Marka Jalan)</option>
                            </select>
                        </div>

                        {/* Kondisi */}
                        <div>
                            <label
                                htmlFor="condition"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Kondisi
                            </label>
                            <select
                                id="condition"
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            >
                                <option value="Baik">Baik</option>
                                <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                                <option value="Rusak">Rusak</option>
                            </select>
                        </div>

                        {/* Tanggal Instalasi */}
                        <div>
                            <label
                                htmlFor="installedDate"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Tanggal Instalasi
                            </label>
                            <input
                                type="date"
                                id="installedDate"
                                name="installedDate"
                                value={formData.installedDate}
                                onChange={handleChange}
                                max={getTodayDate()}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        {/* Deskripsi */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Deskripsi
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="Tuliskan deskripsi singkat inventaris..."
                            />
                        </div>
                    </div>
                </div>

                {/* Input Koordinat Manual */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Koordinat Lokasi
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Koordinat - Label dinamis berdasarkan tipe */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {formData.inventoryType === "line" ? "Latitude Awal" : "Latitude"}
                            </label>
                            <input
                                type="text"
                                name="startLat"
                                value={manualCoords.startLat}
                                onChange={handleManualCoordChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="-7.2264993"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {formData.inventoryType === "line" ? "Longitude Awal" : "Longitude"}
                            </label>
                            <input
                                type="text"
                                name="startLng"
                                value={manualCoords.startLng}
                                onChange={handleManualCoordChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                placeholder="112.7217274"
                            />
                        </div>
                    </div>

                    {/* Untuk tipe garis saja */}
                    {formData.inventoryType === "line" && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Latitude Akhir
                                    </label>
                                    <input
                                        type="text"
                                        name="endLat"
                                        value={manualCoords.endLat}
                                        onChange={handleManualCoordChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        placeholder="-7.2270000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude Akhir
                                    </label>
                                    <input
                                        type="text"
                                        name="endLng"
                                        value={manualCoords.endLng}
                                        onChange={handleManualCoordChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        placeholder="112.7220000"
                                    />
                                </div>
                            </div>

                            {/* Input Panjang - Hanya menampilkan hasil perhitungan */}
                            <div className="max-w-xs">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Panjang (meter)
                                </label>
                                <div className="relative">
                                    <Ruler className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        value={length}
                                        readOnly
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-700 outline-none"
                                        placeholder="Auto calculate"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Panjang otomatis terhitung dari koordinat awal dan akhir
                                </p>
                            </div>
                        </>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <div className="flex items-start">
                            <Navigation className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-700 font-medium">Titik Base: Jalan Surabaya-Gempol</p>
                                <p className="text-sm text-blue-600">
                                    Koordinat contoh: -7.2264993, 112.7217274
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Riwayat Pemeliharaan */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Riwayat Pemeliharaan
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Pemeliharaan Terakhir */}
                        <div>
                            <label
                                htmlFor="lastMaintenance"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Pemeliharaan Terakhir
                            </label>
                            <input
                                type="date"
                                id="lastMaintenance"
                                name="lastMaintenance"
                                value={formData.lastMaintenance}
                                onChange={handleChange}
                                max={getTodayDate()}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-sm text-yellow-700">
                                    🛠️ <strong>Pemeliharaan:</strong> Pastikan tanggal pemeliharaan terakhir selalu diperbarui setelah melakukan perawatan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lokasi (Map) - VIEW ONLY */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Peta Lokasi
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {formData.inventoryType === "point"
                                ? "Posisi di peta (View Only):"
                                : "Garis posisi di peta (View Only):"}
                        </label>

                        {/* Legend untuk garis */}
                        {formData.inventoryType === "line" && (
                            <div className="mb-3 flex items-center space-x-4 text-xs">
                                <div className="flex items-center">
                                    <div className="w-4 h-2 bg-blue-500 rounded mr-1"></div>
                                    <span className="text-gray-600">Garis mengikuti jalan</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-4 h-1 bg-red-400 border border-red-300 border-dashed mr-1"></div>
                                    <span className="text-gray-600">Garis lurus referensi</span>
                                </div>
                            </div>
                        )}

                        <div className="relative z-0">
                            <MapComponent
                                position={position}
                                endPosition={endPosition}
                                isLine={formData.inventoryType === "line"}
                            />
                        </div>

                        {position && (
                            <div className="mt-3 space-y-2">
                                <p className="text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    <strong>
                                        {formData.inventoryType === "line" ? "Start:" : "Position:"}
                                    </strong>
                                    {position.lat.toFixed(7)}, {position.lng.toFixed(7)}
                                </p>
                                {endPosition && formData.inventoryType === "line" && (
                                    <>
                                        <p className="text-sm text-gray-600">
                                            <Navigation className="w-4 h-4 inline mr-1" />
                                            <strong>End:</strong> {endPosition.lat.toFixed(7)}, {endPosition.lng.toFixed(7)}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <Ruler className="w-4 h-4 inline mr-1" />
                                            <strong>Panjang:</strong> {length} meter
                                        </p>
                                    </>
                                )}
                            </div>
                        )}

                        {!position && (
                            <p className="mt-2 text-sm text-yellow-600">
                                ⚠️ Silakan masukkan koordinat untuk melihat lokasi di peta
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </button>
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Simpan Data
                    </button>
                </div>
            </form>
        </div>
    );
}