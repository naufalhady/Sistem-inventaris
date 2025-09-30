// src/app/(dashboard)/laporan/page.tsx

"use client";

import { useState } from "react";
import { Download, FileText, BarChart3, MapPin, Users, Filter } from "lucide-react";

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
    }
];

export default function LaporanPage() {
    const [activeTab, setActiveTab] = useState<"summary" | "inventory" | "users">("summary");
    const [exportFormat, setExportFormat] = useState<"pdf" | "excel">("pdf");

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

    const handleExport = () => {
        // TODO: Implement export logic
        console.log(`Exporting ${activeTab} report as ${exportFormat}`);
        alert(`Mengekspor laporan ${activeTab} dalam format ${exportFormat.toUpperCase()}`);
    };

    const handleQuickExport = (type: "inventory" | "users") => {
        console.log(`Quick exporting ${type} data`);
        alert(`Mengekspor data ${type === "inventory" ? "inventaris" : "pengguna"}`);
    };

    return (
        <div className="p-8 bg-white">
            {/* Header */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Laporan Sistem</h3>
                <p className="text-gray-600">Monitoring dan export data inventaris perlengkapan jalan tol.</p>
            </div>

            {/* Tab Navigation */}
            <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-8">
                    {[
                        { id: "summary", name: "Ringkasan", icon: BarChart3 },
                        { id: "inventory", name: "Data Inventaris", icon: MapPin },
                        { id: "users", name: "Data Pengguna", icon: Users }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
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
            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
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
                        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Laporan
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
                {activeTab === "summary" && (
                    <div className="space-y-6">
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Total Inventaris</h3>
                                        <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <MapPin className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Kondisi Baik</h3>
                                        <p className="text-3xl font-bold text-green-600">{goodCondition}</p>
                                        <p className="text-sm text-green-600 mt-1">{goodPercentage}%</p>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <BarChart3 className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Perlu Perbaikan</h3>
                                        <p className="text-3xl font-bold text-yellow-600">{needsRepair}</p>
                                    </div>
                                    <div className="p-3 bg-yellow-50 rounded-lg">
                                        <FileText className="w-6 h-6 text-yellow-600" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Rusak</h3>
                                        <p className="text-3xl font-bold text-red-600">{damaged}</p>
                                        <p className="text-sm text-red-600 mt-1">{problemPercentage}% bermasalah</p>
                                    </div>
                                    <div className="p-3 bg-red-50 rounded-lg">
                                        <FileText className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Summary */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2" />
                                Ringkasan per Lokasi
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Lokasi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Total
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Baik
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Perlu Perbaikan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rusak
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {Object.entries(locationSummary).map(([location, stats]) => (
                                            <tr key={location}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {location}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {stats.total}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="text-green-600 font-medium">{stats.good}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="text-yellow-600 font-medium">{stats.needsRepair}</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <span className="text-red-600 font-medium">{stats.damaged}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Quick Export */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Export Cepat
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleQuickExport("inventory")}
                                    className="p-4 border border-gray-300 rounded-lg text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                >
                                    <FileText className="w-5 h-5 text-blue-600 mb-2" />
                                    <h4 className="font-medium text-gray-900">Data Inventaris</h4>
                                    <p className="text-sm text-gray-500 mt-1">Export semua data inventaris</p>
                                </button>
                                <button
                                    onClick={() => handleQuickExport("users")}
                                    className="p-4 border border-gray-300 rounded-lg text-left hover:border-green-300 hover:bg-green-50 transition-colors"
                                >
                                    <Users className="w-5 h-5 text-green-600 mb-2" />
                                    <h4 className="font-medium text-gray-900">Data Pengguna</h4>
                                    <p className="text-sm text-gray-500 mt-1">Export semua data pengguna</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "inventory" && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Data Inventaris</h2>
                            <p className="text-gray-600 mt-1">Daftar semua perlengkapan jalan tol</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kondisi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Lokasi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {inventoryData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
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
                )}

                {activeTab === "users" && (
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
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
                                    {usersData.map((user) => (
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
                )}
            </div>
        </div>
    );
}