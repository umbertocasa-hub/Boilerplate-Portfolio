"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
    {
        name: "Accenture",
        logo: "/companies/accenture.png",
        isSvg: false
    },
    {
        name: "IBM",
        logo: "/companies/ibm.png",
        isSvg: false
    },
    {
        name: "Hype",
        logo: "/companies/hype.jpg",
        isSvg: false
    },
    {
        name: "Apple",
        logo: "/companies/apple.png",
        isSvg: false
    },
    {
        name: "Udemy",
        logo: "/companies/udemy.png",
        isSvg: false
    },
    {
        name: "Prometeon",
        logo: "/companies/prometeon.jpg",
        isSvg: false
    },
    {
        name: "Aleide",
        logo: "/companies/aleide.png",
        isSvg: false
    },
    {
        name: "Primo Group",
        logo: "/companies/primo.svg",
        isSvg: false
    },
];

export function CompanySlider() {
    return (
        <div className="w-full overflow-hidden py-10 bg-transparent relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone-50 dark:from-stone-950 to-transparent z-10 pointer-events-none" />

            <motion.div
                className="flex gap-24 items-center whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 40,
                }}
            >
                {[...companies, ...companies].map((company, index) => (
                    <div key={`${company.name}-${index}`} className="flex items-center justify-center transition-all duration-300 px-4">
                        <div className="relative w-40 h-20 flex items-center justify-center">
                            {company.isSvg ? (
                                <div className="w-full h-full text-stone-800 dark:text-stone-200 flex items-center justify-center">
                                    <img 
                                        src={company.logo as string} 
                                        alt={company.name}
                                        className="max-w-full max-h-full object-contain" 
                                    />
                                </div>
                            ) : (
                                <img
                                    src={company.logo as string}
                                    alt={company.name}
                                    className="max-w-[150px] max-h-[70px] object-contain"
                                    onError={(e) => {
                                        console.warn(`Failed to load logo for ${company.name}`);
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
