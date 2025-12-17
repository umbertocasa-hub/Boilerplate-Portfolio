"use client";

import { useState } from "react";
import { generate2fSetupAction, verify2faSetupAction } from "@/lib/actions";

export function TwoFactorSetup({ isEnabled }: { isEnabled: boolean }) {
    const [setupData, setSetupData] = useState<{ secret: string; imageUrl: string } | null>(null);
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleStartSetup() {
        const data = await generate2fSetupAction();
        setSetupData(data);
    }

    async function handleVerify() {
        if (!setupData) return;
        const res = await verify2faSetupAction(setupData.secret, token);
        if (res.success) {
            setSuccess(true);
            setSetupData(null);
        } else {
            setError(res.message || "Errore");
        }
    }

    if (isEnabled) {
        return (
            <div className="flex items-center gap-2 text-green-600 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Autenticazione a due fattori attiva.
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex items-center gap-2 text-green-600 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                Configurazione completata con successo!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {!setupData ? (
                <button
                    onClick={handleStartSetup}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors"
                >
                    Attiva 2FA
                </button>
            ) : (
                <div className="space-y-4 border border-stone-200 dark:border-stone-800 p-4 rounded-lg bg-stone-50 dark:bg-stone-900">
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                        1. Scansiona il codice QR con Google Authenticator.<br />
                        2. Inserisci il codice generato qui sotto.
                    </p>
                    <div className="bg-white p-2 rounded border border-stone-200 w-fit">
                        <img src={setupData.imageUrl} alt="QR Code" className="w-32 h-32" />
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Codice (es. 123456)"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-3 py-2 text-sm w-40 text-stone-900 dark:text-white"
                        />
                        <button
                            onClick={handleVerify}
                            className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors"
                        >
                            Verifica
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            )}
        </div>
    );
}
