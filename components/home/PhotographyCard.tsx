"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, ArrowUpRight } from "lucide-react";
import { item } from "@/lib/animations";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function PhotographyCard() {
    return (
        <Link href="/photography" className="contents">
            <motion.div
                variants={item}
                className="col-span-1 md:col-span-2 md:row-span-1 h-full"
            >
                <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                    <CardBody className="bg-stone-900 dark:bg-black rounded-3xl p-8 text-white relative overflow-hidden group/card cursor-pointer shadow-md hover:shadow-xl transition-all w-full h-full flex flex-col justify-between dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.4]">
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <CardItem translateZ="50" className="w-auto absolute top-4 right-4 bg-white/10 p-2 rounded-full backdrop-blur-md group-hover/card:bg-white/20 transition-colors z-20">
                            <ArrowUpRight size={20} />
                        </CardItem>

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <CardItem translateZ="60">
                                <Camera size={32} className="text-stone-300 group-hover/card:text-white transition-colors" />
                            </CardItem>
                            <div>
                                <CardItem translateZ="50" as="h2" className="text-2xl font-bold mb-1">
                                    Fotografia
                                </CardItem>
                                <CardItem translateZ="40" as="p" className="text-stone-400 text-sm group-hover/card:text-stone-300 transition-colors">
                                    Light & Motors Gallery
                                </CardItem>
                            </div>
                        </div>
                        {/* Abstract Background Element */}
                        <CardItem translateZ="20" className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 group-hover/card:opacity-40 transition-opacity duration-500 pointer-events-none">
                            <></>
                        </CardItem>
                    </CardBody>
                </CardContainer>
            </motion.div>
        </Link>
    );
}
