"use client";

import { motion } from "framer-motion";
import { item } from "@/lib/animations";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { FaReact, FaAws, FaLinux, FaSwift, FaApple } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

export function TechStackCard() {
    return (
        <motion.div
            variants={item}
            className="col-span-1 h-full"
        >
            <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                <CardBody className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-md rounded-3xl p-6 border border-white/60 dark:border-white/10 shadow-sm flex flex-col justify-center items-center gap-4 hover:bg-white/80 dark:hover:bg-stone-800/80 transition-colors w-full h-full hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-indigo-500/[0.4] group/card">
                    <CardItem translateZ="30" as="p" className="text-[10px] font-bold text-stone-400 uppercase tracking-widest text-center">
                        Tech Stack
                    </CardItem>
                    <CardItem translateZ="50" className="flex flex-wrap justify-center gap-4 text-3xl text-stone-600 dark:text-stone-400">
                        <FaReact
                            title="React"
                            className="hover:text-[#61DAFB] transition-colors hover:scale-110 duration-200"
                        />
                        <SiNextdotjs
                            title="Next.js"
                            className="hover:text-black dark:hover:text-white transition-colors hover:scale-110 duration-200"
                        />
                        <FaAws
                            title="AWS"
                            className="hover:text-[#FF9900] transition-colors hover:scale-110 duration-200"
                        />
                        <FaLinux
                            title="Linux"
                            className="hover:text-black dark:hover:text-white transition-colors hover:scale-110 duration-200"
                        />
                        <FaSwift
                            title="Swift"
                            className="hover:text-[#F05138] transition-colors hover:scale-110 duration-200"
                        />
                        <FaApple
                            title="iOS & macOS"
                            className="hover:text-black dark:hover:text-white transition-colors hover:scale-110 duration-200"
                        />
                    </CardItem>
                </CardBody>
            </CardContainer>
        </motion.div>
    );
}
