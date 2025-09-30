// src/app/(dashboard)/inventaris/detailInventaris/page.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Edit, MapPin } from "lucide-react";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

// Dynamic import Map
const MapComponent = dynamic(() => import("../../../components/ui/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-64 w-full rounded-lg border bg-gray-100 animate-pulse" />
    ),
});

function DetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Mock data - nanti diganti dengan fetch dari API
    const item = {
        id: Number(id),
        name: "Lampu Jalan",
        condition: "Baik",
        conditionColor: "text-green-600 bg-green-50",
        location: "KM 15+200 Tol Jakarta-Cikampek",
        description: "Lampu LED 100W dengan tiang galvanis",
        coordinates: { lat: -6.2, lng: 106.8 },
        installedDate: "2023-05-15",
        lastMaintenance: "2024-01-20",
    };

    const handleDelete = () => {
        // Logic untuk menghapus inventaris
        console.log("Menghapus inventaris dengan id:", id);
        // Setelah berhasil hapus, redirect atau tampilkan notifikasi
        setShowDeleteModal(false);
        router.back(); // Kembali ke halaman sebelumnya
    };

    return (
        <div className="p-4 sm:p-8 bg-white">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Detail Inventaris</h3>
                    {/* Teks hanya tampil di desktop */}
                    <p className="text-gray-600 ">
                        Berikut adalah detail dari inventaris yang dipilih:
                    </p>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Hapus
                    </button>
                    <button
                        onClick={() => router.push(`/inventaris/editInventaris?id=${id}`)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Column - Info */}
                <div className="space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Umum
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Nama Inventaris
                                </label>
                                <p className="mt-1 text-base text-gray-900">{item.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Kondisi
                                </label>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${item.conditionColor}`}
                                    >
                                        {item.condition}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Lokasi
                                </label>
                                <p className="mt-1 text-base text-gray-900 flex items-center">
                                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                    {item.location}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Deskripsi
                                </label>
                                <p className="mt-1 text-base text-gray-900">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Info Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Riwayat Pemeliharaan
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Tanggal Instalasi
                                </label>
                                <p className="mt-1 text-base text-gray-900">
                                    {new Date(item.installedDate).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Pemeliharaan Terakhir
                                </label>
                                <p className="mt-1 text-base text-gray-900">
                                    {new Date(item.lastMaintenance).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Map */}
                <div>
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Lokasi pada Peta
                        </h2>
                        <MapComponent
                            position={item.coordinates}
                            setPosition={() => { }} // Read-only untuk detail
                        />
                        <p className="mt-3 text-sm text-gray-600 ">
                            Koordinat: {item.coordinates.lat.toFixed(5)}, {item.coordinates.lng.toFixed(5)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Hapus Inventaris"
                message={`Apakah Anda yakin ingin menghapus "${item.name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
}

export default function DetailInventarisPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <DetailContent />
        </Suspense>
    );
}