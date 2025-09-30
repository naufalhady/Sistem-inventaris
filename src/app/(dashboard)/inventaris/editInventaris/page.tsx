"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
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
    });

    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
        null
    );

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!position) {
            alert("Silakan pilih lokasi di peta.");
            return;
        }

        const newData = {
            ...formData,
            location: position,
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
                    Edit Inventaris
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
                                placeholder="Contoh: Lampu Jalan"
                            />
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

                        {/* Info tambahan bisa ditambah di sini */}
                        <div className="md:col-span-2">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-700">
                                    💡 <strong>Tips:</strong> Pastikan tanggal pemeliharaan terakhir selalu diperbarui setelah melakukan perawatan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lokasi (Map) */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Lokasi
                    </h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pilih Lokasi (Klik pada peta untuk menandai)
                        </label>
                        <div className="relative z-0">
                            <MapComponent position={position} setPosition={setPosition} />
                        </div>
                        {position && (
                            <p className="mt-3 text-sm text-gray-600">
                                📍 Lokasi terpilih: <strong>{position.lat.toFixed(5)}</strong>, <strong>{position.lng.toFixed(5)}</strong>
                            </p>
                        )}
                        {!position && (
                            <p className="mt-2 text-sm text-yellow-600">
                                ⚠️ Silakan klik pada peta untuk memilih lokasi inventaris
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}