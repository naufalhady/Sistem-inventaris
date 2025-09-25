"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { User, LogOut, Menu, BarChart3, CheckSquare, Users, FileText } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [openUser, setOpenUser] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const userRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // mapping path ke judul
    const pageTitleMap: Record<string, string> = {
        "/dashboard": "Beranda",
        "/inventaris": "Inventaris",
        "/dashboard/users": "Pengguna",
        "/dashboard/reports": "Laporan",
    };

    let title = "Dashboard";
    for (const key in pageTitleMap) {
        if (pathname.startsWith(key)) {
            title = pageTitleMap[key];
            break;
        }
    }

    // close dropdown kalau klik di luar
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setOpenUser(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // menu items sama dengan sidebar
    const menuItems = [
        { href: "/dashboard", label: "Beranda", icon: BarChart3 },
        { href: "/inventaris", label: "Inventaris", icon: CheckSquare },
        { href: "/dashboard/users", label: "Pengguna", icon: Users },
        { href: "/dashboard/reports", label: "Laporan", icon: FileText },
    ];

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm relative">
            {/* Left side */}
            <div className="flex items-center space-x-3">
                {/* Mobile Menu Button */}
                <div className="relative md:hidden" ref={menuRef}>
                    <button
                        className="p-2 rounded-lg hover:bg-gray-100"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>

                    {openMenu && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {menuItems.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`flex items-center px-4 py-2 text-sm ${pathname.startsWith(href)
                                            ? "bg-gray-100 font-semibold text-gray-900"
                                            : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => setOpenMenu(false)}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
                {/* Avatar + Dropdown */}
                <div className="relative" ref={userRef}>
                    <button
                        onClick={() => setOpenUser(!openUser)}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-3 py-1 rounded-lg"
                    >
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Hady</span>
                    </button>

                    {openUser && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <button
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => alert("Logout clicked!")}
                            >
                                <LogOut className="w-4 h-4 mr-2 text-gray-600" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
