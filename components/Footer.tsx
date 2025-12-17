"use client";

import { motion } from "framer-motion";
import { FaLinkedin, FaGitlab } from "react-icons/fa";
import { TeamsIcon } from "./icons/TeamsIcon";

export function Footer() {
    return (
        <footer className="w-full py-8 mt-12 border-t border-stone-100 dark:border-stone-800 bg-white dark:bg-stone-950 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 text-stone-500 dark:text-stone-400 text-sm">
                    <span>© {new Date().getFullYear()} Umberto Casa. All rights reserved.</span>
                    <span className="hidden md:inline">•</span>
                    <a
                        href="https://gitlab.com/kiwiprise/portfolio-2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-stone-900 dark:hover:text-white transition-colors border-b border-transparent hover:border-auto"
                    >
                        Come ho fatto questo sito 🚀
                    </a>
                </div>



                <div className="flex gap-4">
                    <motion.a
                        href="https://www.linkedin.com/in/umberto-casa-007/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-[#0A66C2] dark:hover:text-[#0A66C2] transition-colors"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaLinkedin size={28} />
                    </motion.a>

                    <motion.a
                        href="https://gitlab.com/kiwiprise"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-[#FC6D26] dark:hover:text-[#FC6D26] transition-colors"
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaGitlab size={28} />
                    </motion.a>

                    <motion.a
                        href="https://teams.microsoft.com/l/chat/0/0?users=admin@example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:opacity-80 transition-opacity"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        title="Chat su Teams"
                    >
                        <img
                            src="/projects/teams_custom.png"
                            alt="Microsoft Teams"
                            className="w-[26px] h-[26px] object-contain"
                        />
                    </motion.a>
                </div>
            </div>
        </footer>
    );
}
