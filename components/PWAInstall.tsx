"use client";

import { useEffect, useState } from "react";
import { Download, Share } from "lucide-react";

export function PWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !(window as any).MSStream
        );

        setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();

        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
        }
    };

    if (isStandalone) return null;

    if (isIOS) {
        return (
            <button
                disabled
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 rounded-full cursor-help"
                title="Su iOS: Condividi -> Aggiungi alla Home"
            >
                <Share size={14} />
                <span>Installa App</span>
            </button>
        );
    }

    if (!deferredPrompt) return null;

    return (
        <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-full hover:opacity-80 transition-opacity"
        >
            <Download size={14} />
            <span>Installa App</span>
        </button>
    );
}
