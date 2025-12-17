"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, ArrowUpRight } from "lucide-react";
import { item } from "@/lib/animations";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function SystemsCard() {
    return (
        <Link href="/projects" className="contents">
            <motion.div
                variants={item}
                className="col-span-1 md:row-span-2 h-full"
            >
                <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                    <CardBody className="bg-gradient-to-br from-stone-50 to-stone-100/50 dark:from-stone-800 dark:to-stone-900/50 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-between group/card cursor-pointer border border-white/50 dark:border-white/10 hover:border-stone-200 shadow-sm hover:shadow-xl transition-all w-full h-full dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.4]">
                        <div className="flex justify-between items-start">
                            <CardItem translateZ="50" className="w-auto p-3 bg-white dark:bg-stone-700 rounded-2xl shadow-sm group-hover/card:scale-110 transition-transform duration-300">
                                <Terminal size={24} className="text-stone-700 dark:text-stone-200" />
                            </CardItem>
                            <CardItem translateZ="40" className="w-auto">
                                <ArrowUpRight size={20} className="opacity-0 group-hover/card:opacity-100 transition-opacity text-stone-400" />
                            </CardItem>
                        </div>

                        {/* Middle - Mini Roadmap */}
                        <div className="flex-1 flex flex-col justify-center py-4 relative pl-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-stone-200 via-stone-400 to-stone-200 dark:from-stone-700 dark:via-indigo-500 dark:to-stone-700 opacity-50" />

                            <div className="space-y-6 z-10">
                                <CardItem translateZ="40" className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-600 border border-white dark:border-stone-800" />
                                    <span className="text-xs font-mono text-stone-400 dark:text-stone-500">2017 · School</span>
                                </CardItem>

                                <CardItem translateZ="50" className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-stone-400 dark:bg-stone-400 border border-white dark:border-stone-800 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                    <span className="text-xs font-mono text-stone-500 dark:text-stone-300">2020 · Dev</span>
                                </CardItem>

                                <CardItem translateZ="60" className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 rounded-full bg-indigo-500 border border-white dark:border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse" />
                                    </div>
                                    <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">2025 · Architect</span>
                                </CardItem>
                            </div>
                        </div>

                        <div>
                            <CardItem translateZ="30" as="h2" className="text-xl font-bold mb-1 text-stone-800 dark:text-stone-100">
                                Sistemi
                            </CardItem>
                            <CardItem translateZ="20" as="p" className="text-stone-500 dark:text-stone-400 text-xs">
                                DevOps, Cloud & Project Roadmap
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </motion.div>
        </Link>
    );
}
