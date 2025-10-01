// src/app/(dashboard)/laporan/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Download, FileText, BarChart3, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - sama dengan data di sistem
const inventoryData = [
    {
        id: 1,
        name: "Lampu Jalan",
        condition: "Baik",
        conditionColor: "text-green-600 bg-green-50",
        location: "KM 15+200 Tol Jakarta-Cikampek",
        description: "Lampu LED 100W dengan tiang galvanis"
    },
    {
        id: 2,
        name: "Rambu Lalu Lintas",
        condition: "Rusak",
        conditionColor: "text-red-600 bg-red-50",
        location: "KM 22+500 Tol Jakarta-Cikampek",
        description: "Rambu batas kecepatan 80 km/jam"
    },
    {
        id: 3,
        name: "CCTV Pengawas",
        condition: "Baik",
        conditionColor: "text-green-600 bg-green-50",
        location: "KM 18+100 Tol Jakarta-Cikampek",
        description: "Kamera pengawas lalu lintas HD"
    },
    {
        id: 4,
        name: "Guardrail",
        condition: "Perlu Perbaikan",
        conditionColor: "text-yellow-600 bg-yellow-50",
        location: "KM 25+000 Tol Jakarta-Cikampek",
        description: "Pembatas jalan sepanjang 50 meter"
    },
    {
        id: 5,
        name: "Pagar Pengaman",
        condition: "Baik",
        conditionColor: "text-green-600 bg-green-50",
        location: "KM 30+100 Tol Jakarta-Cikampek",
        description: "Pagar pengaman beton"
    },
    {
        id: 6,
        name: "Lampu Penerangan",
        condition: "Rusak",
        conditionColor: "text-red-600 bg-red-50",
        location: "KM 12+500 Tol Jakarta-Cikampek",
        description: "Lampu penerangan jalan"
    }
];

const usersData = [
    {
        id: 1,
        name: "Hady Setiawan",
        email: "hady@example.com",
        role: "Admin",
        roleColor: "text-purple-600 bg-purple-50",
        department: "IT",
        phone: "+62 812-3456-7890",
        createdAt: "2024-01-01"
    },
    {
        id: 2,
        name: "Budi Santoso",
        email: "budi@example.com",
        role: "Teknisi",
        roleColor: "text-blue-600 bg-blue-50",
        department: "Maintenance",
        phone: "+62 813-4567-8901",
        createdAt: "2024-01-02"
    },
    {
        id: 3,
        name: "Siti Rahayu",
        email: "siti@example.com",
        role: "Teknisi",
        roleColor: "text-blue-600 bg-blue-50",
        department: "Operasional",
        phone: "+62 814-5678-9012",
        createdAt: "2024-01-03"
    },
    {
        id: 4,
        name: "Ahmad Fauzi",
        email: "ahmad@example.com",
        role: "Admin",
        roleColor: "text-purple-600 bg-purple-50",
        department: "HRD",
        phone: "+62 815-6789-0123",
        createdAt: "2024-01-04"
    }
];

export default function LaporanPage() {
    const [activeTab, setActiveTab] = useState<"inventory" | "users">("inventory");
    const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Calculate summary statistics
    const totalItems = inventoryData.length;
    const goodCondition = inventoryData.filter(item => item.condition === "Baik").length;
    const needsRepair = inventoryData.filter(item => item.condition === "Perlu Perbaikan").length;
    const damaged = inventoryData.filter(item => item.condition === "Rusak").length;

    const goodPercentage = Math.round((goodCondition / totalItems) * 100);
    const problemPercentage = Math.round(((needsRepair + damaged) / totalItems) * 100);

    // Group by location
    const locationSummary = inventoryData.reduce((acc, item) => {
        const location = item.location.split(' ')[0] + ' ' + item.location.split(' ')[1]; // Get "KM XX" part
        if (!acc[location]) {
            acc[location] = { total: 0, good: 0, needsRepair: 0, damaged: 0 };
        }
        acc[location].total++;
        if (item.condition === "Baik") acc[location].good++;
        if (item.condition === "Perlu Perbaikan") acc[location].needsRepair++;
        if (item.condition === "Rusak") acc[location].damaged++;
        return acc;
    }, {} as Record<string, { total: number; good: number; needsRepair: number; damaged: number }>);

    // Pagination calculations
    const totalPages = Math.ceil(
        activeTab === "inventory" ? inventoryData.length / itemsPerPage :
            activeTab === "users" ? usersData.length / itemsPerPage : 1
    );

    const currentInventoryData = inventoryData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const currentUsersData = usersData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when tab changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab]);

    // Responsive items per page
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(5);
            } else {
                setItemsPerPage(10);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleExport = () => {
        console.log(`Exporting ${activeTab} report as ${exportFormat}`);
        alert(`Mengekspor laporan ${activeTab} dalam format ${exportFormat.toUpperCase()}`);
    };

    const handleQuickExport = (type: "inventory" | "users") => {
        console.log(`Quick exporting ${type} data`);
        alert(`Mengekspor data ${type === "inventory" ? "inventaris" : "pengguna"}`);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    return (
        <div className="p-4 sm:p-8 bg-white">
            {/* Header */}
            <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Laporan Sistem</h3>
                <p className="text-gray-600 text-sm sm:text-base">Monitoring dan export data inventaris perlengkapan jalan tol.</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 border-b border-blue-200">
                <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
                    {[
                        { id: "inventory", name: "Data Inventaris", icon: MapPin },
                        { id: "users", name: "Data Pengguna", icon: Users }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                                        ? "border-blue-500 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Export Controls */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">Export sebagai:</span>
                    <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value as "pdf" | "excel")}
                        className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                    >
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={handleExport}
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Laporan
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {activeTab === "inventory" && (
                    <div>
                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Data Inventaris</h2>
                                <p className="text-gray-600 mt-1">Daftar semua perlengkapan jalan tol</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-blue-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                                Kondisi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                                Lokasi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">
                                                Deskripsi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentInventoryData.map((item) => (
                                            <tr key={item.id} className="hover:bg-blue-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${item.conditionColor}`}>
                                                        {item.condition}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.location}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {item.description}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block md:hidden space-y-4">
                            {currentInventoryData.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                            <p className="text-sm text-gray-500 mt-1">{item.location}</p>
                                        </div>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${item.conditionColor}`}>
                                            {item.condition}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {currentInventoryData.length} dari {inventoryData.length} data
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-gray-500 px-3">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div>
                        {/* Desktop Table */}
                        <div className="hidden md:block bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Data Pengguna</h2>
                                <p className="text-gray-600 mt-1">Daftar semua pengguna sistem</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Role
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Departemen
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Bergabung
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentUsersData.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${user.roleColor}`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.department}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Mobile Cards */}
                        <div className="block md:hidden space-y-4">
                            {currentUsersData.map((user) => (
                                <div
                                    key={user.id}
                                    className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{user.name}</h4>
                                            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
                                        </div>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${user.roleColor}`}>
                                            {user.role}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                        <div>
                                            <span className="font-medium">Departemen:</span> {user.department}
                                        </div>
                                        <div>
                                            <span className="font-medium">Bergabung:</span> {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-500">
                                Menampilkan {currentUsersData.length} dari {usersData.length} data
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-gray-500 px-3">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}