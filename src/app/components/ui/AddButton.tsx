// ui/components/AddButton.tsx
import React from "react";

interface AddButtonProps {
    onClick?: () => void;     // fungsi opsional tanpa argumen
    label?: string;           // teks tombol
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    className?: string;
}

export default function AddButton({
    onClick,
    label = "Tambah",
    size = "md",
    disabled = false,
    className = "",
}: AddButtonProps) {
    const sizeClasses = {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-base",
        lg: "px-4 py-3 text-lg",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className={`inline-flex items-center gap-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed ${sizeClasses[size] || sizeClasses.md
                } ${className}`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                />
            </svg>
            <span>{label}</span>
        </button>
    );
}
