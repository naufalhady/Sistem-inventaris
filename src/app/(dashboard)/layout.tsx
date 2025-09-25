// src/app/(dashboard)/layout.tsx
import Sidebar from '../components/shared/Sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}