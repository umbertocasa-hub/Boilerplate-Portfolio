"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle, Eye, EyeOff, Fingerprint } from "lucide-react";
import {
    loginAction,
    setupAction,
    generateAuthenticationOptionsAction,
    verifyAuthenticationAction
} from "@/lib/actions";
import { AnimatePresence, motion } from "framer-motion";
import { startAuthentication } from '@simplewebauthn/browser';

interface LoginFormProps {
    hasUsers: boolean;
}

export function LoginForm({ hasUsers }: LoginFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);

    async function handleBiometricLogin() {
        setIsLoading(true);
        setError("");

        // Use hardcoded email for single-user admin, or prompt user.
        // For this portfolio, unlikely multiple admins, so we default to the main one.
        const email = "admin@example.com";

        try {
            // 1. Get options
            const optsRes = await generateAuthenticationOptionsAction(email);
            if (!optsRes.success || !optsRes.options) {
                throw new Error(optsRes.message || "Opzioni biometria non valide");
            }

            // 2. Browser ceremony
            const authResp = await startAuthentication({ optionsJSON: optsRes.options });

            // 3. Verify
            const verifyRes = await verifyAuthenticationAction(email, authResp);

            if (verifyRes.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    router.push("/admin");
                    router.refresh();
                }, 1000);
            } else {
                throw new Error(verifyRes.message || "Autenticazione fallita");
            }

        } catch (e: any) {
            console.error("Biometric Login Failed", e);

            let msg = "Accesso biometrico fallito.";
            if (e.name === 'NotAllowedError') {
                msg = "Nessuna chiave trovata su questo dispositivo o operazione annullata.";
            } else if (e.name === 'SecurityError') {
                msg = "Errore di sicurezza (dominio non valido?).";
            } else if (e.message) {
                msg = e.message;
            }

            setError(msg);
            handleFailure();
        } finally {
            if (!isSuccess) setIsLoading(false);
        }
    }

    function handleFailure() {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 3) {
            router.push("/nice-try");
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setError("");

        try {
            const action = hasUsers ? loginAction : setupAction;
            const result = await action(formData);

            if (result?.success) {
                setIsSuccess(true);
                // Wait for animation
                setTimeout(() => {
                    router.push("/admin");
                    router.refresh();
                }, 1000);
            } else {
                setError(result?.message || "Credenziali non valide");
                setIsLoading(false);
                handleFailure();
            }
        } catch (e) {
            setError("Si è verificato un errore imprevisto");
            setIsLoading(false);
            handleFailure();
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-10 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">Accesso Effettuato</h3>
                <p className="text-stone-500">Reindirizzamento alla dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <form action={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder={hasUsers ? "Password" : "Crea Password"}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={showPassword ? "hide" : "show"}
                                    initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type={showPin ? "text" : "password"}
                            name="pin"
                            placeholder={hasUsers ? "PIN" : "Crea PIN (es: 123456)"}
                            inputMode="numeric"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPin(!showPin)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={showPin ? "hide" : "show"}
                                    initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                    </div>

                    {hasUsers && (
                        <input
                            type="text"
                            name="token"
                            placeholder="Codice Authenticator (opzionale)"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                        />
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2 animate-pulse">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black text-white font-medium py-2 rounded-lg hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Verifica...
                        </>
                    ) : (
                        hasUsers ? "Accedi in Sicurezza" : "Configura e Accedi"
                    )}
                </button>
            </form>

            {hasUsers && (
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-stone-200 dark:border-stone-700" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-stone-50 dark:bg-stone-950 px-2 text-stone-500">
                            Oppure usa Biometria
                        </span>
                    </div>
                </div>
            )}

            {hasUsers && (
                <button
                    onClick={handleBiometricLogin}
                    disabled={isLoading}
                    className="relative w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-stone-200 dark:border-stone-800 rounded-xl hover:border-black dark:hover:border-white transition-colors group overflow-hidden"
                >
                    {/* Apple-style Scanning Animation */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                initial={{ scale: 0, opacity: 0.5 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                                className="w-12 h-12 rounded-full bg-blue-500/20 absolute"
                            />
                            <motion.div
                                initial={{ scale: 0, opacity: 0.8 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
                                className="w-12 h-12 rounded-full bg-blue-500/40 absolute"
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    )}

                    <div className="relative z-10 flex items-center gap-2">
                        {isLoading ? (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Fingerprint className="w-6 h-6 text-blue-500" />
                            </motion.div>
                        ) : (
                            <Fingerprint className="w-5 h-5 text-stone-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                        )}
                        <span className={`font-medium transition-colors ${isLoading ? 'text-blue-500' : 'text-stone-600 dark:text-stone-400 group-hover:text-black dark:group-hover:text-white'}`}>
                            {isLoading ? "Scansione..." : "Accedi con Passkey"}
                        </span>
                    </div>
                </button>

            )}
        </div>
    );
}
