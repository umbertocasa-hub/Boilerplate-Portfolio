"use client";
import React from "react";

export const MacWindow = ({
    children,
    className,
    title,
}: {
    children: React.ReactNode;
    className?: string;
    title?: string;
}) => {
    return (
        <div className={`rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl ${className}`}>
            {/* Window Header */}
            <div className="bg-stone-800/80 backdrop-blur-md px-4 py-3 flex items-center gap-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {title && <span className="text-xs text-stone-400 font-mono">{title}</span>}
            </div>

            {/* Window Content */}
            <div className="p-4 bg-[#1e1e1e] font-mono text-sm overflow-x-auto text-stone-300">
                {children}
            </div>
        </div>
    );
};
