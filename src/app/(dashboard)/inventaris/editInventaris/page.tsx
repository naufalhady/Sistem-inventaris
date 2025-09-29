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

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <div className="relative max-w-[200px] flex-1">
                <h1 className="text-lg font-semibold text-gray-900 mb-4">
                    Edit Inventaris
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama Inventaris */}
                <div>
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
                        className="w-full sm:w-sm px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                        className="w-full sm:w-sm px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                        <option value="Baik">Baik</option>
                        <option value="Perlu Perbaikan">Perlu Perbaikan</option>
                        <option value="Rusak">Rusak</option>
                    </select>
                </div>

                {/* Deskripsi */}
                <div>
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
                        className="w-full sm:w-sm px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        placeholder="Tuliskan deskripsi singkat..."
                    />
                </div>

                {/* Lokasi (Map) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lokasi (Klik pada peta untuk menandai)
                    </label>
                    <MapComponent position={position} setPosition={setPosition} />
                    {position && (
                        <p className="mt-2 text-sm text-gray-600">
                            Lokasi terpilih: {position.lat.toFixed(5)},{" "}
                            {position.lng.toFixed(5)}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Simpan
                    </button>
                </div>
            </form>
        </div>
    );
}