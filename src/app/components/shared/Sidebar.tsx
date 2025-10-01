"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CheckSquare, Users, LogOut, FileText, Package } from 'lucide-react';
import Image from 'next/image';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        {
            href: '/dashboard',
            icon: BarChart3,
            label: 'Beranda',
            isActive: pathname === '/dashboard'
        },
        {
            href: '/inventaris',
            icon: CheckSquare,
            label: 'Inventaris',
            isActive: pathname.startsWith('/inventaris')
        },
        {
            href: '/pengguna',
            icon: Users,
            label: 'Pengguna',
            isActive: pathname.startsWith('/pengguna')
        },
        {
            href: '/laporan',
            icon: FileText,
            label: 'Laporan',
            isActive: pathname.startsWith('/laporan')
        }
    ];

    return (
        <aside className="w-auto bg-white border-r border-gray-200 h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Image
                            src="/LogoJasaMarga.svg"
                            alt="Jasa Marga Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                    </div>
                    <div>
                        <h3 className=" font-semibold text-gray-900">Sistem Inventaris</h3>
                        <p className="text-sm text-gray-500">Rambu Jalan</p>
                    </div>

                </div>
            </div>


            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm  transition-colors ${item.isActive
                                        ? 'bg-gray-100 text-gray-900 font-bold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-regular hover:font-bold'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}