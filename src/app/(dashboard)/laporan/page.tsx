// src/app/(dashboard)/laporan/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download, Filter, Calendar, BarChart3, FileText, MapPin, AlertTriangle } from "lucide-react";

interface ReportData {
    id: number;
    title: string;
    type: string;
    period: string;
    generatedDate: string;
    status: string;
    statusColor: string;
    downloadCount: number;
}

interface InventoryStats {
    totalItems: number;
    goodCondition: number;
    needsRepair: number;
    damaged: number;
    maintenanceThisMonth: number;
}

export default function LaporanPage() {
    const router = useRouter();

    const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly");
    const [dateRange, setDateRange] = useState({
        start: "",
        end: ""
    });

    // Data statistik inventaris
    const inventoryStats: InventoryStats = {
        totalItems: 156,
        goodCondition: 124,
        needsRepair: 18,
        damaged: 14,
        maintenanceThisMonth: 23
    };

    // Data laporan yang telah digenerate
    const reportData: ReportData[] = [
        {
            id: 1,
            title: "Laporan Bulanan Inventaris",
            type: "Bulanan",
            period: "Januari 2024",
            generatedDate: "2024-01-31",
            status: "Selesai",
            statusColor: "text-green-600 bg-green-50",
            downloadCount: 15
        },
        {
            id: 2,
            title: "Laporan Kondisi Perlengkapan",
            type: "Kondisi",
            period: "Q1 2024",
            generatedDate: "2024-03-31",
            status: "Selesai",
            statusColor: "text-green-600 bg-green-50",
            downloadCount: 8
        },
        {
            id: 3,
            title: "Laporan Pemeliharaan",
            type: "Pemeliharaan",
            period: "Maret 2024",
            generatedDate: "2024-03-15",
            status: "Selesai",
            statusColor: "text-green-600 bg-green-50",
            downloadCount: 12
        },
        {
            id: 4,
            title: "Laporan Inspeksi Rutin",
            type: "Inspeksi",
            period: "Minggu ke-2 Mar 2024",
            generatedDate: "2024-03-10",
            status: "Dalam Proses",
            statusColor: "text-yellow-600 bg-yellow-50",
            downloadCount: 0
        }
    ];

    const handleGenerateReport = () => {
        // TODO: Logic untuk generate laporan
        console.log("Generate laporan dengan periode:", selectedPeriod, dateRange);
        alert("Laporan sedang diproses...");
    };

    const handleDownloadReport = (reportId: number) => {
        // TODO: Logic untuk download laporan
        console.log("Download laporan dengan ID:", reportId);
        alert(`Mengunduh laporan #${reportId}`);
    };

    const handleQuickReport = (type: string) => {
        // TODO: Logic untuk quick report
        console.log("Quick report:", type);
        alert(`Membuat laporan ${type}...`);
    };

    return (
        <div className="p-8 bg-white">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Laporan & Analitik</h1>
                <p className="text-gray-600">Pantau dan unduh laporan sistem inventaris perlengkapan jalan tol.</p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Inventaris</h3>
                            <p className="text-3xl font-bold text-gray-900">{inventoryStats.totalItems}</p>
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
                            <p className="text-3xl font-bold text-green-600">{inventoryStats.goodCondition}</p>
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
                            <p className="text-3xl font-bold text-yellow-600">{inventoryStats.needsRepair}</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Pemeliharaan Bulan Ini</h3>
                            <p className="text-3xl font-bold text-purple-600">{inventoryStats.maintenanceThisMonth}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Generate Report */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Generate Report Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Buat Laporan Baru
                        </h2>

                        <div className="space-y-4">
                            {/* Report Type Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Jenis Laporan
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => handleQuickReport("inventory")}
                                        className="p-4 border border-gray-300 rounded-lg text-left hover:border-blue-300 hover:bg-blue-50 transition-colors"
                                    >
                                        <FileText className="w-5 h-5 text-blue-600 mb-2" />
                                        <h4 className="font-medium text-gray-900">Inventaris</h4>
                                        <p className="text-sm text-gray-500 mt-1">Laporan semua perlengkapan</p>
                                    </button>
                                    <button
                                        onClick={() => handleQuickReport("maintenance")}
                                        className="p-4 border border-gray-300 rounded-lg text-left hover:border-green-300 hover:bg-green-50 transition-colors"
                                    >
                                        <BarChart3 className="w-5 h-5 text-green-600 mb-2" />
                                        <h4 className="font-medium text-gray-900">Pemeliharaan</h4>
                                        <p className="text-sm text-gray-500 mt-1">Riwayat perawatan</p>
                                    </button>
                                </div>
                            </div>

                            {/* Period Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Periode Laporan
                                </label>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                >
                                    <option value="daily">Harian</option>
                                    <option value="weekly">Mingguan</option>
                                    <option value="monthly">Bulanan</option>
                                    <option value="quarterly">Triwulan</option>
                                    <option value="yearly">Tahunan</option>
                                    <option value="custom">Kustom</option>
                                </select>
                            </div>

                            {/* Date Range (conditional) */}
                            {selectedPeriod === 'custom' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Mulai
                                        </label>
                                        <input
                                            type="date"
                                            value={dateRange.start}
                                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Selesai
                                        </label>
                                        <input
                                            type="date"
                                            value={dateRange.end}
                                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Generate Button */}
                            <button
                                onClick={handleGenerateReport}
                                className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition-colors"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Generate Laporan
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Recent Reports */}
                <div className="space-y-6">
                    {/* Recent Reports Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <Calendar className="w-5 h-5 mr-2" />
                            Laporan Terbaru
                        </h2>

                        <div className="space-y-4">
                            {reportData.map((report) => (
                                <div
                                    key={report.id}
                                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-gray-900 text-sm">
                                            {report.title}
                                        </h4>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${report.statusColor}`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <p>Jenis: {report.type}</p>
                                        <p>Periode: {report.period}</p>
                                        <p>Dibuat: {new Date(report.generatedDate).toLocaleDateString('id-ID')}</p>
                                        <p>Download: {report.downloadCount} kali</p>
                                    </div>
                                    <button
                                        onClick={() => handleDownloadReport(report.id)}
                                        className="w-full mt-3 flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <Download className="w-3 h-3 mr-1" />
                                        Unduh Laporan
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Akses Cepat
                        </h2>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleQuickReport("condition")}
                                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-900">Laporan Kondisi</span>
                                <BarChart3 className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                                onClick={() => handleQuickReport("maintenance-schedule")}
                                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-900">Jadwal Perawatan</span>
                                <Calendar className="w-4 h-4 text-gray-400" />
                            </button>
                            <button
                                onClick={() => handleQuickReport("damage")}
                                className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
                            >
                                <span className="text-sm font-medium text-gray-900">Laporan Kerusakan</span>
                                <AlertTriangle className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}