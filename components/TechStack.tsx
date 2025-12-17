"use client";

import { motion } from "framer-motion";
import {
    SiHtml5, SiCss3, SiReact, SiJavascript, SiPhp,
    SiNodedotjs, SiBootstrap, SiGit, SiSwift, SiDocker,
    SiAmazon, SiGnubash
} from "react-icons/si";
import { FaJava, FaTerminal, FaWindows } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { MdDevices, MdAccessibility } from "react-icons/md";

const techStack = [
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "PHP", icon: SiPhp, color: "#777BB4" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Swift", icon: SiSwift, color: "#F05138" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "AWS S3", icon: SiAmazon, color: "#FF9900" },
    { name: "Azure", icon: VscAzure, color: "#0078D4" },
    { name: "Active Dir.", icon: FaWindows, color: "#0078D6" },
    { name: "PowerShell", icon: FaTerminal, color: "#5391FE" },
    { name: "Bash", icon: SiGnubash, color: "#4EAA25" },
    { name: "Responsive", icon: MdDevices, color: "#000000" },
    { name: "a11y", icon: MdAccessibility, color: "#000000" },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function TechStack() {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Strumenti e Framework</h2>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                {techStack.map((tech) => (
                    <motion.div
                        key={tech.name}
                        variants={item}
                        whileHover={{ scale: 1.05, borderColor: tech.color }}
                        className="flex flex-col items-center justify-center p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm hover:shadow-md transition-all cursor-default"
                    >
                        <tech.icon className="text-3xl mb-2" style={{ color: tech.color }} />
                        <span className="text-sm font-medium text-stone-600 dark:text-stone-300">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
