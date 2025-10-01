// src/app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Building, Package } from "lucide-react";
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simple validation
        if (!formData.email || !formData.password) {
            setError("Email dan password harus diisi");
            setIsLoading(false);
            return;
        }

        try {
            // TODO: Replace with actual API call
            console.log("Login attempt:", formData);

            // Mock authentication - replace with real API call
            if (formData.email === "admin@inventaris.com" && formData.password === "password123") {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Store auth token (in real app, this would be from API response)
                localStorage.setItem("authToken", "mock-jwt-token");
                localStorage.setItem("userRole", "Admin");
                localStorage.setItem("userName", "Admin Inventaris");

                // Redirect to dashboard
                router.push("/dashboard");
            } else {
                setError("Email atau password salah");
            }
        } catch (err) {
            setError("Terjadi kesalahan saat login");
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="max-w-sm w-full space-y-8">

                {/* Header */}
                <div className="p-6 mb-4">
                    <div className="flex items-center justify-center space-x-4">
                        {/* Logo */}
                        <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm">
                            {/* <Package className="w-8 h-8 text-white" /> */}
                            <Image
                                src="/LogoJasaMarga.svg"
                                alt="Jasa Marga Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                        </div>


                        {/* Text */}
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Sistem Inventaris
                            </h2>
                            <p className="text-gray-600">
                                Rambu Jalan
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-600 text-center">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <p className=" text-md font-md text-gray-700 mb-4">
                                Masuk ke akun Anda untuk melanjutkan
                            </p>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isLoading}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                                placeholder="masukkan email Anda"
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed pr-12 text-sm"
                                    placeholder="masukkan password Anda"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50 text-sm"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center px-3 py-2 border border-transparent text-base font-medium rounded-lg text-white bg-slate-800 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm text-md mt-8"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Memproses...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Masuk
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <div className="block sm:flex sm:justify-center sm:items-center">
                        <p className="text-xs text-gray-500 mb-2 sm:mb-0 sm:mr-1">
                            © 2025 Sistem Inventaris
                        </p>
                        <p className="text-xs text-gray-500">
                            Rambu Jalan. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}