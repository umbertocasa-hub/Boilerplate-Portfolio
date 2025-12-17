"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    // Determine which icon to show:
    // If hovering, show the *opposite* (preview).
    // If not hovering, show current state in "inactive" position, but we want the icon to match the theme?
    // User said "se ci passi sopra il sole diventa luna".
    // Light -> Sun. Hover -> Moon.
    // Dark -> Moon. Hover -> Sun.
    const showMoon = isDark ? !isHovered : isHovered;

    return (
        <div
            className="relative flex items-center w-14 h-8 rounded-full p-1 cursor-pointer bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-colors"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                layout
                initial={false}
                animate={{
                    x: isDark
                        ? (isHovered ? 18 : 24) // Dark: at end (24), nudge left on hover (18)
                        : (isHovered ? 6 : 0)   // Light: at start (0), nudge right on hover (6)
                }}
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                className="w-6 h-6 rounded-full bg-white dark:bg-stone-950 shadow-sm flex items-center justify-center text-stone-900 dark:text-stone-100"
            >
                <motion.div
                    key={showMoon ? "moon" : "sun"}
                    initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                >
                    {showMoon ? (
                        <Moon size={14} />
                    ) : (
                        <Sun size={14} className="text-amber-500" />
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
