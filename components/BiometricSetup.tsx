'use client';

import { useState } from 'react';
import { startRegistration } from '@simplewebauthn/browser';
import { generateRegistrationOptionsAction, verifyRegistrationAction, deletePasskeyAction } from '@/lib/actions';
import { Fingerprint, Loader2, CheckCircle, XCircle, Trash2, Smartphone, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Authenticator {
    credentialID: string;
    createdAt: Date | null;
    transports?: string | null;
}

interface BiometricSetupProps {
    authenticators?: Authenticator[];
}

export function BiometricSetup({ authenticators = [] }: BiometricSetupProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const registerPasskey = async () => {
        setIsLoading(true);
        setStatus('idle');
        setMessage('');

        try {
            // 1. Get options from server
            const optsRes = await generateRegistrationOptionsAction();
            if (!optsRes.success || !optsRes.options) {
                throw new Error(optsRes.message || 'Errore inizializzazione');
            }

            // 2. Browser ceremony
            // @simplewebauthn/browser expects the JSON options directly
            const attResp = await startRegistration({ optionsJSON: optsRes.options });

            // 3. Verify on server
            const verifyRes = await verifyRegistrationAction(attResp);

            if (verifyRes.success) {
                setStatus('success');
                setMessage('Biometria configurata con successo!');
            } else {
                setStatus('error');
                setMessage(verifyRes.message || 'Verifica fallita');
            }
        } catch (e: any) {
            console.error('Registration failed:', e);
            if (e.name === 'NotAllowedError') {
                setMessage('Operazione annullata o tempo scaduto.');
            } else if (e.name === 'InvalidStateError') {
                setMessage('Questo dispositivo è già registrato.');
            } else {
                setMessage(e.message || 'Errore durante la registrazione');
            }
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    const deletePasskey = async (id: string) => {
        if (!confirm("Sei sicuro di voler rimuovere questa chiave?")) return;

        try {
            const res = await deletePasskeyAction(id);
            if (res.success) {
                // Next.js Server Actions revalidatePath handles the UI update if passed as prop
                setStatus('idle'); // clear messages
            } else {
                alert("Errore durante la rimozione: " + res.message);
            }
        } catch (e) {
            alert("Errore imprevisto");
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-stone-800 rounded-xl shadow-sm border border-stone-200 dark:border-stone-700">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Fingerprint className="w-5 h-5" />
                Accesso Biometrico
            </h3>

            <p className="text-stone-500 text-sm mb-6">
                Gestisci le chiavi di accesso (Passkeys) per il login rapido.
            </p>

            <div className="flex flex-col gap-6">
                {/* List of existing keys */}
                {authenticators.length > 0 ? (
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100">Chiavi attive:</h4>
                        {authenticators.map((auth, idx) => (
                            <div key={auth.credentialID} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-lg border border-stone-100 dark:border-stone-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                                        <Fingerprint className="w-4 h-4 text-stone-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium truncate w-32 sm:w-auto">
                                            Passkey {idx + 1}
                                        </span>
                                        <span className="text-xs text-stone-400">
                                            Creata il {auth.createdAt ? new Date(auth.createdAt).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deletePasskey(auth.credentialID)}
                                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Rimuovi chiave"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-lg border border-dashed border-stone-200 dark:border-stone-800 text-center">
                        <p className="text-stone-500 text-sm">Nessuna passkey configurata.</p>
                        <p className="text-xs text-stone-400 mt-1">Aggiungine una per accedere senza password.</p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-stone-100 dark:border-stone-700">
                    <button
                        onClick={registerPasskey}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 py-2 bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all font-medium"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Configurazione...
                            </>
                        ) : (
                            <>
                                <Fingerprint className="w-4 h-4" />
                                Aggiungi Nuova Passkey
                            </>
                        )}
                    </button>

                    <AnimatePresence mode="wait">
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-green-600 text-sm font-medium"
                            >
                                <CheckCircle className="w-4 h-4" />
                                {message}
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-red-600 text-sm font-medium"
                            >
                                <XCircle className="w-4 h-4" />
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
