"use client";

import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    createColumnHelper,
    type SortingState
} from '@tanstack/react-table';
import { useState, useEffect } from 'react';
import { Search, ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react';
import AddButton from "../../components/ui/AddButton";

// Define the type for our inventory data
interface InventoryItem {
    id: number;
    name: string;
    condition: string;
    conditionColor: string;
    location: string;
    description: string;
}

export default function DashboardPage() {
    const [data, setData] = useState<InventoryItem[]>([
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
    ]);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState<string>('');


    const columnHelper = createColumnHelper<InventoryItem>();

    const columns = [
        columnHelper.accessor('name', {
            header: 'Nama Inventaris',
            cell: info => (
                <div className="font-medium text-gray-900">
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor('condition', {
            header: 'Kondisi',
            cell: info => {
                const row = info.row.original;
                return (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${row.conditionColor}`}>
                        {info.getValue()}
                    </span>
                );
            },
        }),
        columnHelper.accessor('location', {
            header: 'Lokasi',
            cell: info => {
                const row = info.row.original;
                return (
                    <div>
                        <p className="font-medium text-gray-900">{info.getValue()}</p>
                        <p className="text-sm text-gray-500">{row.description}</p>
                    </div>
                );
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: '',
            cell: info => (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        onClick={() => handleEdit(info.row.original.id)}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(info.row.original.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        initialState: {
            pagination: {
                pageSize: 10,
            },
        },
    });

    // Responsive pageSize: 10 desktop, 5 mobile
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                table.setPageSize(5);
            } else {
                table.setPageSize(10);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, [table]);

    const handleDelete = (id: number) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    const handleEdit = (id: number) => {
        console.log("Edit item with id:", id);
    };

    const handleAdd = () => {
        setData((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name: "Item Baru",
                condition: "Baik",
                conditionColor: "text-green-600 bg-green-50",
                location: "Lokasi baru",
                description: "Deskripsi item baru",
            },
        ]);
    };


    return (
        <div className="p-8 bg-white">
            {/* Header Section */}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Selamat datang kembali, Hady</h3>
                <p className="text-gray-600">Lacak dan kelola Perlengkapan Jalan Tol.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Total inventaris</h3>
                    <p className="text-3xl font-bold text-gray-900">{data.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Total titik penempatan</h3>
                    <p className="text-3xl font-bold text-gray-900">15</p>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Total inventaris kondisi baik</h3>
                    <p className="text-3xl font-bold text-gray-900">
                        {data.filter(item => item.condition === 'Baik').length}
                    </p>
                </div>
            </div>

            {/* Table Controls */}
            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <div className="relative max-w-[300px] flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Cari inventaris..."
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
                    />
                </div>
                <AddButton onClick={handleAdd} label="Tambah Inventaris" size="md" />
            </div>

            {/* Table (Desktop) */}
            <div className="hidden md:block bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-max w-full">
                        <thead className="bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            <div className="flex items-center space-x-1">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {header.column.getIsSorted() &&
                                                    (header.column.getIsSorted() === "desc" ? (
                                                        <ChevronDown className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ))}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 whitespace-nowrap"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="border-t border-gray-200">
                    <div className="flex items-center justify-between p-4">
                        <span className="text-sm text-gray-500">
                            Menampilkan {table.getRowModel().rows.length} dari {data.length} data
                        </span>
                        <div className="flex items-center space-x-9">
                            <button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                Sebelumnya
                            </button>
                            <span className="text-sm text-gray-500">
                                Laman {table.getState().pagination.pageIndex + 1} dari{" "}
                                {table.getPageCount()}
                            </span>
                            <button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                            >
                                Selanjutnya
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cards (Mobile) */}
            <div className="block md:hidden space-y-4">
                {table.getPaginationRowModel().rows.map((row) => {
                    const item = row.original as InventoryItem;
                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.location}</p>
                                </div>
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${item.conditionColor}`}
                                >
                                    {item.condition}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{item.description}</p>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 mt-3">
                                <button
                                    onClick={() => handleEdit(item.id)}
                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    );
                })}

                {/* Pagination for cards */}
                <div className="flex items-center justify-between mt-4">
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Sebelumnya
                    </button>
                    <span className="text-sm text-gray-500">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    );
}