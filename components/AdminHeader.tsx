"use client";

import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions";
import Link from "next/link";

export function AdminHeader() {
    return (
        <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10 w-full transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/admin" className="text-lg font-bold tracking-tight text-stone-900 dark:text-white">
                    Portfolio Admin
                </Link>

                <button
                    onClick={() => logoutAction()}
                    className="flex items-center gap-2 text-sm text-stone-500 hover:text-red-600 transition-colors"
                >
                    <LogOut size={16} />
                    Esci
                </button>
            </div>
        </header>
    );
}
