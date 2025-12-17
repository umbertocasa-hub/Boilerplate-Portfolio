"use client";

import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Send } from "lucide-react";
import { useState } from "react";
import { sendContactEmailAction as sendContactEmail } from "@/lib/actions";
import { motion } from "framer-motion";

export function ContactCard() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const result = await sendContactEmail(formData);

        if (result.success) {
            setStatus('success');
            (e.target as HTMLFormElement).reset();
        } else {
            setStatus('error');
            setErrorMessage(result.message || 'Errore sconosciuto');
        }
        setLoading(false);
    };

    return (
        <CardContainer className="inter-var w-full h-full">
            <CardBody className="bg-white/90 dark:bg-black/90 backdrop-blur-sm relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border flex flex-col justify-between transition-colors duration-500">
                <div>
                    <CardItem
                        translateZ="50"
                        className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-500 dark:from-white dark:to-neutral-400"
                    >
                        Contattami
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 font-medium"
                    >
                        Hai un progetto in mente? Scrivimi!
                    </CardItem>

                    <CardItem translateZ="80" className="w-full mt-6">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Il tuo nome"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:focus:ring-indigo-500/50 transition-all placeholder:text-neutral-400 group-hover:bg-white dark:group-hover:bg-black"
                                />
                            </div>
                            <div className="group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="La tua email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:focus:ring-indigo-500/50 transition-all placeholder:text-neutral-400 group-hover:bg-white dark:group-hover:bg-black"
                                />
                            </div>
                            <div className="group">
                                <textarea
                                    name="message"
                                    placeholder="Il tuo messaggio..."
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:focus:ring-indigo-500/50 transition-all placeholder:text-neutral-400 resize-none group-hover:bg-white dark:group-hover:bg-black"
                                />
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                {status === 'success' && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-emerald-500 text-sm font-bold flex items-center gap-1"
                                    >
                                        Messaggio inviato! 🚀
                                    </motion.span>
                                )}
                                {status === 'error' && (
                                    <span className="text-red-500 text-sm font-medium">{errorMessage}</span>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="ml-auto flex items-center gap-2 bg-gradient-to-r from-stone-800 to-black dark:from-stone-200 dark:to-white text-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-stone-500/20 hover:shadow-xl hover:shadow-stone-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                                >
                                    <span className="group-hover/btn:pr-1 transition-all">
                                        {loading ? 'Invio...' : 'Invia'}
                                    </span>
                                    <Send size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </form>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
