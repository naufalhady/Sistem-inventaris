"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Edit, MapPin, Navigation, Ruler, Calendar, Package, AlertCircle, CheckCircle, Clock } from "lucide-react";
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

// Interface untuk data inventaris
interface Coordinate {
    lat: number;
    lng: number;
}

interface InventoryData {
    id: number;
    name: string;
    condition: string;
    conditionColor: string;
    description: string;
    location: string;
    installedDate: string;
    lastMaintenance: string;
    inventoryType: "point" | "line";
    position: Coordinate | null;
    endPosition: Coordinate | null;
    length: string;
    manualCoords: {
        startLat: string;
        startLng: string;
        endLat: string;
        endLng: string;
    };
}

// Mock data - nanti bisa diganti dengan data dari API berdasarkan ID
const mockInventoryData: InventoryData = {
    id: 1,
    name: "Lampu Jalan LED",
    condition: "Baik",
    conditionColor: "text-green-600 bg-green-50",
    description: "Lampu LED 100W dengan tiang galvanis untuk penerangan jalan tol",
    location: "KM 15+200 Tol Jakarta-Cikampek",
    installedDate: "2024-01-15",
    lastMaintenance: "2024-06-20",
    inventoryType: "point",
    position: { lat: -7.2264993, lng: 112.7217274 },
    endPosition: null,
    length: "",
    manualCoords: {
        startLat: "-7.2264993",
        startLng: "112.7217274",
        endLat: "",
        endLng: ""
    }
};

export default function DetailInventoryPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [inventoryData, setInventoryData] = useState<InventoryData>(mockInventoryData);

    // Dalam implementasi real, ini akan fetch data dari API berdasarkan ID
    useEffect(() => {
        // TODO: Fetch data dari API berdasarkan ID
        console.log("Loading data for ID:", id);
        // setInventoryData(fetchedData);
    }, [id]);

    const getConditionIcon = (condition: string) => {
        switch (condition) {
            case "Baik":
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case "Perlu Perbaikan":
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case "Rusak":
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Package className="w-5 h-5 text-gray-600" />;
        }
    };

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case "Baik":
                return "text-green-800 bg-green-100 border-green-200";
            case "Perlu Perbaikan":
                return "text-yellow-800 bg-yellow-100 border-yellow-200";
            case "Rusak":
                return "text-red-800 bg-red-100 border-red-200";
            default:
                return "text-gray-800 bg-gray-100 border-gray-200";
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleEdit = () => {
        router.push(`/inventaris/editInventaris?id=${id}`);
    };

    // Safe coordinate display
    const displayCoordinate = (coord: Coordinate | null, prefix: string = "") => {
        if (!coord) return "-";
        return `${prefix}${coord.lat.toFixed(7)}, ${coord.lng.toFixed(7)}`;
    };

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Detail Inventaris
                        </h3>
                        <p className="text-gray-600">
                            Informasi lengkap inventaris perlengkapan jalan tol
                        </p>
                    </div>
                    {/* <button
                        onClick={handleEdit}
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </button> */}
                </div>
            </div>

            {/* Informasi Utama */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Card Informasi */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Informasi Umum */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Package className="w-5 h-5 mr-2 text-blue-600" />
                                Informasi Umum
                            </h4>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Inventaris
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {inventoryData.name}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tipe Inventaris
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {inventoryData.inventoryType === "point" ? "Titik" : "Garis"}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Kondisi
                                    </label>
                                    <span className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full border ${getConditionColor(inventoryData.condition)}`}>
                                        {getConditionIcon(inventoryData.condition)}
                                        {inventoryData.condition}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lokasi
                                    </label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {inventoryData.location}
                                    </p>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Deskripsi
                                    </label>
                                    <p className="text-gray-700 leading-relaxed">
                                        {inventoryData.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Koordinat */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                                Koordinat Lokasi
                            </h4>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {inventoryData.inventoryType === "line" ? "Latitude Awal" : "Latitude"}
                                    </label>
                                    <p className="text-lg font-mono text-gray-900 bg-gray-50 p-2 rounded border">
                                        {inventoryData.manualCoords.startLat}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {inventoryData.inventoryType === "line" ? "Longitude Awal" : "Longitude"}
                                    </label>
                                    <p className="text-lg font-mono text-gray-900 bg-gray-50 p-2 rounded border">
                                        {inventoryData.manualCoords.startLng}
                                    </p>
                                </div>
                            </div>

                            {inventoryData.inventoryType === "line" && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Latitude Akhir
                                            </label>
                                            <p className="text-lg font-mono text-gray-900 bg-gray-50 p-2 rounded border">
                                                {inventoryData.manualCoords.endLat || "-"}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Longitude Akhir
                                            </label>
                                            <p className="text-lg font-mono text-gray-900 bg-gray-50 p-2 rounded border">
                                                {inventoryData.manualCoords.endLng || "-"}
                                            </p>
                                        </div>
                                    </div>

                                    {inventoryData.length && (
                                        <div className="max-w-xs">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Panjang
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <Ruler className="w-4 h-4 text-gray-400" />
                                                <p className="text-lg font-semibold text-gray-900">
                                                    {inventoryData.length} meter
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar - Informasi Tambahan */}
                <div className="space-y-6">
                    {/* Status & Timeline */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                Timeline
                            </h4>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Tanggal Instalasi
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <p className="text-gray-900 font-medium">
                                            {formatDate(inventoryData.installedDate)}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pemeliharaan Terakhir
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <p className="text-gray-900 font-medium">
                                            {formatDate(inventoryData.lastMaintenance)}
                                        </p>
                                    </div>
                                </div>

                                {/* Status indicator */}
                                <div className="pt-4 border-t border-gray-200">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(inventoryData.condition)}`}>
                                        {getConditionIcon(inventoryData.condition)}
                                        <span className="ml-1">Aktif</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    {/* <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900">
                                Aksi Cepat
                            </h4>
                        </div>
                        <div className="p-6 space-y-3">
                            <button
                                onClick={handleEdit}
                                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Inventaris
                            </button>
                            <button
                                onClick={() => router.back()}
                                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Kembali
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>

            {/* Peta Lokasi */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Navigation className="w-5 h-5 mr-2 text-blue-600" />
                        Peta Lokasi
                    </h4>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {inventoryData.inventoryType === "point"
                                ? "Posisi di peta:"
                                : "Garis posisi di peta:"}
                        </label>

                        {/* Legend untuk garis */}
                        {inventoryData.inventoryType === "line" && (
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
                    </div>

                    <div className="relative z-0">
                        <MapComponent
                            position={inventoryData.position}
                            endPosition={inventoryData.endPosition}
                            isLine={inventoryData.inventoryType === "line"}
                        />
                    </div>

                    {inventoryData.position && (
                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-600">
                                <MapPin className="w-4 h-4 inline mr-1" />
                                <strong>
                                    {inventoryData.inventoryType === "line" ? "Start:" : "Position:"}
                                </strong>
                                {displayCoordinate(inventoryData.position)}
                            </p>
                            {inventoryData.endPosition && inventoryData.inventoryType === "line" && (
                                <>
                                    <p className="text-sm text-gray-600">
                                        <Navigation className="w-4 h-4 inline mr-1" />
                                        <strong>End:</strong> {displayCoordinate(inventoryData.endPosition)}
                                    </p>
                                    {inventoryData.length && (
                                        <p className="text-sm text-gray-600">
                                            <Ruler className="w-4 h-4 inline mr-1" />
                                            <strong>Panjang:</strong> {inventoryData.length} meter
                                        </p>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali ke Daftar
                </button>
                <button
                    onClick={handleEdit}
                    className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Inventaris
                </button>
            </div>
        </div>
    );
}