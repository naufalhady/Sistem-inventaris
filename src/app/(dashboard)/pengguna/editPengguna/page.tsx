// src/app/(dashboard)/users/edit/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Suspense } from "react";

interface UserFormData {
    name: string;
    email: string;
    role: "Admin" | "Teknisi";
    department: string;
    phone: string;
    address: string;
}

function EditContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [formData, setFormData] = useState<UserFormData>({
        name: "",
        email: "",
        role: "Teknisi",
        department: "",
        phone: "",
        address: ""
    });

    // Load user data
    useEffect(() => {
        // Mock data - nanti diganti dengan fetch dari API
        if (id) {
            setFormData({
                name: "Hady Setiawan",
                email: "hady@example.com",
                role: "Admin",
                department: "IT",
                phone: "+62 812-3456-7890",
                address: "Jl. Tol Jakarta-Cikampek KM 15, Jakarta"
            });
        }
    }, [id]);

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

        console.log("Data Pengguna yang Diupdate:", {
            ...formData,
            id: id
        });

        // TODO: Simpan ke API
        router.push("/pengguna");
    };

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <div className="mb-6">
                {/* <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Kembali
                </button> */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">Edit Pengguna</h3>
                <p className="text-gray-600">
                    Perbarui informasi pengguna di bawah ini
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Pribadi
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nomor Telepon *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="+62 812-3456-7890"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Work Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Pekerjaan
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="Teknisi">Teknisi</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                                    Departemen *
                                </label>
                                <input
                                    type="text"
                                    id="department"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    placeholder="Masukkan departemen"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Alamat
                    </h2>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Masukkan alamat lengkap"
                        />
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

export default function EditPenggunaPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading...</div>}>
            <EditContent />
        </Suspense>
    );
}