// src/app/(dashboard)/layout.tsx
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-white ">
            {/* Sidebar hanya muncul di desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
