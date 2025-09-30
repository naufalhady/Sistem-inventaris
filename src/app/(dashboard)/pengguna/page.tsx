// src/app/(dashboard)/users/page.tsx

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
import { useRouter } from 'next/navigation';
import { Search, ChevronUp, ChevronDown, Edit, Trash2, UserPlus, Eye } from 'lucide-react';
import AddButton from "../../components/ui/AddButton";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";

// Define the type for user data
interface User {
    id: number;
    name: string;
    email: string;
    role: "Admin" | "Teknisi";
    roleColor: string;
    department: string;
    phone: string;
    createdAt: string;
}

export default function UsersManagementPage() {
    const router = useRouter();

    const [data, setData] = useState<User[]>([
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
            role: "Teknisi",
            roleColor: "text-blue-600 bg-blue-50",
            department: "Maintenance",
            phone: "+62 815-6789-0123",
            createdAt: "2024-01-04"
        },
        {
            id: 5,
            name: "Maria Wijaya",
            email: "maria@example.com",
            role: "Admin",
            roleColor: "text-purple-600 bg-purple-50",
            department: "HRD",
            phone: "+62 816-7890-1234",
            createdAt: "2024-01-05"
        },
        {
            id: 6,
            name: "Rizki Pratama",
            email: "rizki@example.com",
            role: "Teknisi",
            roleColor: "text-blue-600 bg-blue-50",
            department: "Quality Control",
            phone: "+62 817-8901-2345",
            createdAt: "2024-01-06"
        }
    ]);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState<string>('');
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        userId: number | null;
        userName: string;
    }>({
        isOpen: false,
        userId: null,
        userName: "",
    });

    const columnHelper = createColumnHelper<User>();

    const columns = [
        columnHelper.accessor('name', {
            header: 'Nama Pengguna',
            cell: info => (
                <div>
                    <div className="font-medium text-gray-900">{info.getValue()}</div>
                    <div className="text-sm text-gray-500">{info.row.original.email}</div>
                </div>
            ),
        }),
        columnHelper.accessor('role', {
            header: 'Role',
            cell: info => {
                const row = info.row.original;
                return (
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${row.roleColor}`}>
                        {info.getValue()}
                    </span>
                );
            },
        }),
        columnHelper.accessor('department', {
            header: 'Departemen',
            cell: info => (
                <div className="text-sm text-gray-900">{info.getValue()}</div>
            ),
        }),
        columnHelper.accessor('phone', {
            header: 'Telepon',
            cell: info => (
                <div className="text-sm text-gray-500">{info.getValue()}</div>
            ),
        }),
        columnHelper.accessor('createdAt', {
            header: 'Tanggal Dibuat',
            cell: info => (
                <div className="text-sm text-gray-500">
                    {new Date(info.getValue()).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })}
                </div>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: '',
            cell: info => (
                <div className="flex items-center justify-end space-x-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleView(info.row.original.id);
                        }}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        title="Lihat Detail"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(info.row.original.id);
                        }}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(info.row.original.id, info.row.original.name);
                        }}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Hapus"
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

    const openDeleteModal = (id: number, name: string) => {
        setDeleteModal({
            isOpen: true,
            userId: id,
            userName: name,
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
        if (deleteModal.userId) {
            setData((prev) => prev.filter((user) => user.id !== deleteModal.userId));
            closeDeleteModal();
        }
    };

    const handleEdit = (id: number) => {
        router.push(`./pengguna/editPengguna?id=${id}`);
        
    };

    const handleView = (id: number) => {
        router.push(`./pengguna/detailPengguna?id=${id}`);
    };

    const handleAdd = () => {
        router.push("./pengguna/tambahPengguna");
    };

    const handleRowClick = (id: number) => {
        router.push(`./pengguna/detailPengguna?id=${id}`);
    };

    return (
        <div className="p-8 bg-white">
            {/* Header Section */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Management Pengguna</h3>
                <p className="text-gray-600">Kelola akses dan data pengguna sistem inventaris.</p>
            </div>

            {/* Table Controls */}
            <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                <div className="relative max-w-[300px] flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none shadow-sm"
                    />
                </div>
                <AddButton
                    onClick={handleAdd}
                    label="Tambah Pengguna"
                    size="md"
                    // icon={<UserPlus className="w-4 h-4" />}
                />
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
                                    onClick={() => handleRowClick(row.original.id)}
                                    className="hover:bg-gray-50 transition-colors cursor-pointer"
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
                            Menampilkan {table.getRowModel().rows.length} dari {data.length} pengguna
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
                    const user = row.original as User;
                    return (
                        <div
                            key={user.id}
                            onClick={() => handleRowClick(user.id)}
                            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 cursor-pointer hover:border-blue-300 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${user.roleColor}`}>
                                    {user.role}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                <div>
                                    <span className="font-medium">Departemen:</span> {user.department}
                                </div>
                                <div>
                                    <span className="font-medium">Telepon:</span> {user.phone}
                                </div>
                                <div className="col-span-2">
                                    <span className="font-medium">Dibuat:</span> {new Date(user.createdAt).toLocaleDateString('id-ID')}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 mt-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleView(user.id);
                                    }}
                                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                    title="Lihat Detail"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEdit(user.id);
                                    }}
                                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        openDeleteModal(user.id, user.name);
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Hapus"
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
                        Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
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