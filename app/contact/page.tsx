"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGitlab } from "react-icons/fa";
import { ContactCard } from "@/components/home/ContactCard";
import { BookingCard } from "@/components/home/BookingCard";
import { Mail, MapPin, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    return (
        <div className="min-h-[85vh] py-12 px-4 max-w-7xl mx-auto flex flex-col gap-12">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-4 max-w-2xl mx-auto"
            >
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-stone-900 via-stone-700 to-stone-500 dark:from-white dark:via-stone-200 dark:to-stone-500">
                    Parliamo.
                </h1>
                <p className="text-stone-500 text-lg md:text-xl font-light leading-relaxed">
                    Prenota una call diretta o scrivimi un messaggio. Scegli tu la strada migliore.
                </p>

                {/* Visual Socials */}
                <div className="flex justify-center gap-4 pt-2">
                    <SocialButton href="https://www.linkedin.com/in/umberto-casa-007/" icon={<FaLinkedin size={20} />} color="hover:text-[#0A66C2]" label="LinkedIn" />
                    <SocialButton href="https://gitlab.com/kiwiprise" icon={<FaGitlab size={20} />} color="hover:text-[#FC6D26]" label="GitLab" />
                </div>
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                {/* Left Column: Booking Calendar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="w-full h-[600px] lg:h-[700px]"
                >
                    <BookingCard />
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="w-full h-[600px] lg:h-[700px] flex flex-col gap-6"
                >
                    <ContactCard />

                    {/* Quick Info below form for mobile/desktop layout balance */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <CopyCard
                            icon={<Mail className="w-4 h-4" />}
                            label="Email"
                            value="admin@example.com"
                            copyValue="admin@example.com"
                        />
                        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center gap-3 transition-opacity hover:opacity-80">
                            <div className="p-2 bg-white dark:bg-stone-800 rounded-xl shadow-sm text-amber-500">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Location</p>
                                <p className="text-sm text-stone-800 dark:text-stone-200 font-medium truncate">Torino / Remote</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function CopyCard({ icon, label, value, copyValue }: { icon: React.ReactNode, label: string, value: string, copyValue: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(copyValue);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 flex items-center gap-4 text-left transition-all hover:scale-[1.02] active:scale-[0.98] hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/10 group"
        >
            <div className={`p-2.5 rounded-xl shadow-sm transition-colors ${copied ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-white dark:bg-stone-800 text-blue-500'}`}>
                {copied ? <Check className="w-5 h-5" /> : icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-0.5 flex justify-between">
                    {label}
                    <span className={`text-[10px] bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded text-stone-500 transition-opacity ${copied ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>Copia</span>
                </p>
                <p className="text-stone-800 dark:text-stone-200 font-medium truncate w-full">{value}</p>
            </div>
        </button>
    );
}

function SocialButton({ href, icon, color, label }: { href: string; icon: React.ReactNode; color: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-100 dark:border-stone-800 text-stone-500 transition-all hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-stone-800 ${color}`}
            aria-label={label}
        >
            {icon}
        </a>
    );
}
