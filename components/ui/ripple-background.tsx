"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RippleProps extends React.HTMLAttributes<HTMLDivElement> { }

export const RippleBackground = ({ className, style, ...props }: RippleProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rippleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onPointerMove = (event: PointerEvent) => {
            if (rippleRef.current) {
                rippleRef.current.style.left = `${event.clientX}px`;
                rippleRef.current.style.top = `${event.clientY}px`;
                rippleRef.current.style.opacity = "1";
            }
        };

        const onPointerLeave = () => {
            if (rippleRef.current) {
                rippleRef.current.style.opacity = "0";
            }
        }

        if (typeof window !== "undefined") {
            window.addEventListener("pointermove", onPointerMove);
            document.addEventListener("pointerleave", onPointerLeave); // window doesn't always fire leave
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("pointermove", onPointerMove);
                document.removeEventListener("pointerleave", onPointerLeave);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "absolute inset-0 z-0 overflow-hidden",
                className
            )}
            {...props}
        >
            {/* The glowing orb/ripple */}
            <div
                ref={rippleRef}
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] transition-opacity duration-300 opacity-0"
                style={{
                    ...style,
                }}
            />
        </div>
    );
};
