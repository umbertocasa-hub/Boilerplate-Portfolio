"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Terminal, Home, Mail, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { PWAInstall } from "./PWAInstall";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/photography", label: "Fotografia", icon: Camera },
    { href: "/projects", label: "Sistemi", icon: Terminal },
    { href: "/contact", label: "Contatti", icon: Mail },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-100 dark:border-stone-800 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight hover:opacity-70 transition-opacity text-stone-900 dark:text-white mr-4">
                    PORTFOLIO
                </Link>

                <div className="flex gap-3 sm:gap-6 items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-black dark:hover:text-white",
                                    isActive ? "text-black dark:text-white" : "text-stone-500 dark:text-stone-400"
                                )}
                            >
                                <Icon size={18} />
                                <span className="hidden sm:inline">{item.label}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-black dark:bg-white"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <div className="flex items-center gap-2 pl-4 border-l border-stone-200 dark:border-stone-700 ml-2">
                        <PWAInstall />
                        <ThemeToggle />
                        <Link
                            href="/login"
                            className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white"
                            aria-label="Admin Login"
                        >
                            <Shield size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
