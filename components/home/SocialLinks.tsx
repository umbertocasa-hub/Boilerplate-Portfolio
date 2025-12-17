"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaGitlab } from "react-icons/fa";
import { item } from "@/lib/animations";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export function SocialLinks() {
    return (
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4 h-full">
            <Link href="https://www.linkedin.com/in/umberto-casa-007/" target="_blank" className="contents">
                <motion.div variants={item} className="h-full">
                    <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                        <CardBody className="bg-[#0077B5] rounded-3xl p-6 flex items-center justify-center text-white text-3xl cursor-pointer shadow-md hover:shadow-xl transition-all w-full h-full group/card hover:brightness-110 dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.4]">
                            <CardItem translateZ="50" className="w-auto">
                                <FaLinkedin />
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </motion.div>
            </Link>

            <Link href="https://gitlab.com/kiwiprise" target="_blank" className="contents">
                <motion.div variants={item} className="h-full">
                    <CardContainer className="inter-var w-full h-full" containerClassName="h-full">
                        <CardBody className="bg-[#FC6D26] rounded-3xl p-6 flex items-center justify-center text-white text-3xl cursor-pointer shadow-md hover:shadow-xl transition-all w-full h-full group/card hover:brightness-110 dark:hover:shadow-2xl dark:hover:shadow-orange-500/[0.4]">
                            <CardItem translateZ="50" className="w-auto">
                                <FaGitlab />
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                </motion.div>
            </Link>
        </div>
    );
}
