// src/app/(auth)/login/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Building } from "lucide-react";

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
            <div className="max-w-md w-full space-y-8">

                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center justify-center space-x-4">
                        {/* Logo */}
                        <div className="bg-gray-800 p-3 rounded-2xl">
                            <Building className="w-8 h-8 text-white" />
                        </div>

                        {/* Text */}
                        <div className="text-left">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Sistem Inventaris
                            </h2>
                            <p className="text-gray-600">
                                Perlengkapan Jalan Tol
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-600 text-center">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <p className=" text-sm text-gray-500">
                            Masuk ke akun Anda untuk melanjutkan
                        </p>
                        <div>
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed pr-12"
                                    placeholder="masukkan password Anda"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Memproses...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Masuk
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        © 2024 Sistem Inventaris Perlengkapan Jalan Tol. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}