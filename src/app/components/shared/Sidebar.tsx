"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, CheckSquare, Users, LogOut, FileText, Package } from 'lucide-react';

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
            href: '/dashboard/users',
            icon: Users,
            label: 'Pengguna',
            isActive: pathname.startsWith('/dashboard/users')
        },
        {
            href: '/dashboard/reports',
            icon: FileText,
            label: 'Laporan',
            isActive: pathname.startsWith('/dashboard/reports')
        }
    ];

    return (
        <aside className="w-auto bg-white border-r border-gray-200 h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Package className="w-7 h-7 text-gray-900" />
                    </div>
                    <div>
                        <h3 className=" font-semibold text-gray-900">Sistem Inventaris</h3>
                        <p className="text-sm text-gray-500">Perlengkapan Jalan Tol</p>
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

            {/* User Profile
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face&auto=format"
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Olivia Rhye</p>
                            <p className="text-xs text-gray-500">olivia@untitledui.com</p>
                        </div>
                    </div>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div> */}
        </aside>
    );
}