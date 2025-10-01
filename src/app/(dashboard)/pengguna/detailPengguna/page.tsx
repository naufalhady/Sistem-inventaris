// src/app/(dashboard)/users/detail/page.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, Edit, Mail, Phone, Building, Calendar, User, Trash2 } from "lucide-react";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Teknisi";
    roleColor: string;
    department: string;
    phone: string;
    createdAt: string;
    address?: string;
}

function DetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        userId: number | null;
        userName: string;
    }>({
        isOpen: false,
        userId: null,
        userName: "",
    });

    // Mock data - nanti diganti dengan fetch dari API
    const user: User = {
        id: Number(id),
        name: "Hady Setiawan",
        email: "hady@example.com",
        role: "Admin",
        roleColor: "text-purple-600 bg-purple-50",
        department: "IT",
        phone: "+62 812-3456-7890",
        createdAt: "2024-01-15",
        address: "Jl. Tol Jakarta-Cikampek KM 15, Jakarta"
    };

    const openDeleteModal = () => {
        setDeleteModal({
            isOpen: true,
            userId: user.id,
            userName: user.name,
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            userId: null,
            userName: "",
        });
    };

    const handleDelete = () => {
        // TODO: Logic untuk menghapus pengguna dari API
        console.log("Menghapus pengguna dengan id:", deleteModal.userId);

        // Setelah berhasil hapus, redirect ke halaman pengguna
        closeDeleteModal();
        router.push("/pengguna");
    };

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    {/* <button
                        onClick={() => router.back()}
                        className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Kembali
                    </button> */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Detail Pengguna</h3>
                    <p className="text-gray-600 hidden sm:block">
                        Berikut adalah detail informasi pengguna yang dipilih:
                    </p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={openDeleteModal}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                    </button>
                    <button
                        onClick={() => router.push(`/pengguna/editPengguna?id=${id}`)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Personal Info */}
                <div className="space-y-6">
                    {/* Personal Info Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <User className="w-5 h-5 mr-2" />
                            Informasi Pribadi
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    ID Pengguna
                                </label>
                                <p className="mt-1 text-base text-gray-900 font-mono">
                                    #{user.id.toString().padStart(4, '0')}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Nama Lengkap
                                </label>
                                <p className="mt-1 text-base text-gray-900">{user.name}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Email
                                </label>
                                <p className="mt-1 text-base text-gray-900 flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                    {user.email}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Nomor Telepon
                                </label>
                                <p className="mt-1 text-base text-gray-900 flex items-center">
                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                    {user.phone}
                                </p>
                            </div>

                            {user.address && (
                                <div>
                                    <label className="text-sm font-medium text-gray-500">
                                        Alamat
                                    </label>
                                    <p className="mt-1 text-base text-gray-900">
                                        {user.address}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Work Info */}
                <div className="space-y-6">
                    {/* Work Info Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Building className="w-5 h-5 mr-2" />
                            Informasi Pekerjaan
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Role
                                </label>
                                <div className="mt-1">
                                    <span
                                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${user.roleColor}`}
                                    >
                                        {user.role}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Departemen
                                </label>
                                <p className="mt-1 text-base text-gray-900 flex items-center">
                                    <Building className="w-4 h-4 mr-2 text-gray-400" />
                                    {user.department}
                                </p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-500">
                                    Tanggal Bergabung
                                </label>
                                <p className="mt-1 text-base text-gray-900 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                    {new Date(user.createdAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Hapus Pengguna"
                message={`Apakah Anda yakin ingin menghapus pengguna "${deleteModal.userName}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Ya, Hapus"
                cancelText="Batal"
            />
        </div>
    );
}

export default function DetailPenggunaPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <DetailContent />
        </Suspense>
    );
}