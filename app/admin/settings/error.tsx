"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Settings Page Error:", error);
    }, [error]);

    return (
        <div className="p-6 bg-red-50 text-red-900 rounded-xl border border-red-200">
            <h2 className="text-xl font-bold mb-2">Qualcosa è andato storto!</h2>
            <p className="mb-4">Impossibile caricare le impostazioni.</p>
            <code className="block p-4 bg-red-100 rounded text-sm font-mono mb-4 break-words">
                {error.message}
            </code>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
                Riprova
            </button>
        </div>
    );
}
