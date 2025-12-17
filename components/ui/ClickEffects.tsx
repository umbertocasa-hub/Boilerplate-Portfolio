"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClickEffect {
    id: number;
    x: number;
    y: number;
}

export function ClickEffects() {
    const [clicks, setClicks] = useState<ClickEffect[]>([]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const id = Date.now();
            setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);

            // Clean up after animation
            setTimeout(() => {
                setClicks((prev) => prev.filter((c) => c.id !== id));
            }, 600);
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {clicks.map((click) => (
                    <ClickBurst key={click.id} x={click.x} y={click.y} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ClickBurst({ x, y }: { x: number; y: number }) {
    // Generate a few random particles
    const particles = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        angle: (i * 60) + Math.random() * 30, // Spread nicely
    }));

    return (
        <div style={{ position: "absolute", left: x, top: y }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                    animate={{
                        x: Math.cos(p.angle * (Math.PI / 180)) * 40,
                        y: Math.sin(p.angle * (Math.PI / 180)) * 40,
                        opacity: 0,
                        scale: 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute w-2 h-2 rounded-full bg-stone-900 dark:bg-white"
                />
            ))}
            <motion.div
                initial={{ opacity: 0.5, scale: 0 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.4 }}
                className="absolute -left-4 -top-4 w-8 h-8 rounded-full border border-stone-400 dark:border-stone-600"
            />
        </div>
    );
}
