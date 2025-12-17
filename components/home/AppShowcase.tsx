"use client";

import { motion } from "framer-motion";
import { item } from "@/lib/animations";
import Image from "next/image";

export function AppShowcase() {
    return (
        <motion.div
            variants={item}
            className="w-full space-y-12"
        >
            {/* iOS & macOS Apps Section */}
            <div className="space-y-6">
                <h3 className="text-2xl font-bold px-4 flex items-center gap-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                        iOS & macOS Development
                    </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                    {/* Weather App */}
                    <div className="group relative rounded-3xl overflow-hidden aspect-[9/19.5] md:aspect-auto md:h-[400px] shadow-lg hover:shadow-2xl transition-all duration-500 neumorph-subtle border border-white/40 dark:border-white/5">
                        <Image
                            src="/projects/weather_app.jpg"
                            alt="Weather App Interface"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h4 className="text-white font-bold text-xl">Weather Simple</h4>
                            <p className="text-stone-300 text-sm">SwiftUI • WeatherKit</p>
                        </div>
                    </div>

                    {/* Mac Monitor */}
                    <div className="group relative rounded-3xl overflow-hidden h-[300px] md:h-[400px] shadow-lg hover:shadow-2xl transition-all duration-500 neumorph-subtle border border-white/40 dark:border-white/5 md:col-span-2">
                        <Image
                            src="/projects/mac_monitor.jpg"
                            alt="Mac System Monitor"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h4 className="text-white font-bold text-xl">System Monitor</h4>
                            <p className="text-stone-300 text-sm">macOS • Widget • Performance</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                    {/* Video Editor */}
                    <div className="group relative rounded-3xl overflow-hidden h-[300px] shadow-lg hover:shadow-2xl transition-all duration-500 neumorph-subtle border border-white/40 dark:border-white/5">
                        <Image
                            src="/projects/video_app.png"
                            alt="Video Editor App"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h4 className="text-white font-bold text-xl">Action Cam Editor</h4>
                            <p className="text-stone-300 text-sm">AVFoundation • Metal</p>
                        </div>
                    </div>


                </div>
            </div>
        </motion.div>
    );
}
