"use client";

import { motion } from "framer-motion";
import { Camera, Smartphone, Aperture } from "lucide-react";
import { SiSony, SiGoogle } from "react-icons/si";
import Image from "next/image";

type GearItem = {
    name: string;
    image?: string;
    link?: string;
};

type Category = {
    category: string;
    icon: any;
    brandIcon: any;
    brandColor: string;
    items: GearItem[];
};

const gear: Category[] = [
    {
        category: "Corpi Macchina",
        icon: Camera,
        brandIcon: SiSony,
        brandColor: "#000000",
        items: [
            {
                name: "Sony Alpha 7 II",
                image: "https://placehold.co/100x100/png?text=A7II",
                link: "https://www.sony.it/electronics/fotocamere-obiettivo-intercambiabile/ilce-7m2-body-kit"
            },
            {
                name: "Sony Alpha 6000",
                image: "/gear/sony-a6000.jpg",
                link: "https://www.sony.it/electronics/fotocamere-obiettivo-intercambiabile/ilce-6000-body-kit"
            }
        ],
    },
    {
        category: "Obiettivi",
        icon: Aperture,
        brandIcon: SiSony,
        brandColor: "#000000",
        items: [
            {
                name: "Sony 24-70mm GM",
                image: "/gear/sony-24-70.jpg",
                link: "https://www.sony.it/electronics/obiettivi-fotocamera/sel2470gm"
            },
            {
                name: "Sony 200-600mm G",
                image: "/gear/sony-200-600.jpg",
                link: "https://www.sony.it/electronics/obiettivi-fotocamera/sel200600g"
            },
            {
                name: "Sony 50mm",
                image: "https://placehold.co/100x100/png?text=50mm",
                link: "https://www.sony.it/electronics/obiettivi-fotocamera/sel50f18f"
            }
        ],
    },
    {
        category: "Mobile",
        icon: Smartphone,
        brandIcon: SiGoogle,
        brandColor: "#4285F4",
        items: [
            {
                name: "Google Pixel 8 Pro",
                image: "https://placehold.co/100x100/png?text=Pixel",
                link: "https://pixel.withgoogle.com/Pixel_8_Pro?hl=it&country=IT&dark=1"
            }
        ],
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function GearList() {
    return (
        <div className="py-12 border-t border-stone-100 mt-12">
            <h2 className="text-2xl font-bold mb-8 tracking-tight flex items-center gap-2">
                <Camera className="w-6 h-6" /> Attrezzatura
            </h2>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {gear.map((g) => (
                    <motion.div
                        key={g.category}
                        variants={item}
                        className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl text-stone-700 dark:text-stone-300 group-hover:bg-black group-hover:text-white transition-colors">
                                <g.icon size={24} />
                            </div>
                            <g.brandIcon size={24} style={{ color: g.brandColor }} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <h3 className="text-lg font-semibold mb-3">{g.category}</h3>
                        <ul className="space-y-4">
                            {g.items.map((gearItem) => (
                                <li key={gearItem.name}>
                                    {gearItem.link ? (
                                        <a
                                            href={gearItem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/item flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-800 p-2 -mx-2 rounded-lg transition-colors"
                                        >
                                            {gearItem.image ? (
                                                <div className="relative w-12 h-12 bg-white dark:bg-stone-800 rounded-lg border border-stone-100 dark:border-stone-700 p-1 shrink-0 overflow-hidden">
                                                    <Image
                                                        src={gearItem.image}
                                                        alt={gearItem.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 group-hover/item:bg-black dark:group-hover/item:bg-white transition-colors ml-2 mr-1" />
                                            )}

                                            <span className="text-stone-600 dark:text-stone-400 font-medium text-sm group-hover/item:text-black dark:group-hover/item:text-white transition-colors underline decoration-dotted underline-offset-4 decoration-stone-300 dark:decoration-stone-600 group-hover/item:decoration-black dark:group-hover/item:decoration-white">
                                                {gearItem.name}
                                            </span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-2 p-2 -mx-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-600 ml-2" />
                                            <span className="text-stone-500 dark:text-stone-400 text-sm">{gearItem.name}</span>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
