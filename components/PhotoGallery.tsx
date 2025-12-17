"use client";

import { Photo } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export function PhotoGallery({ photos }: { photos: Photo[] }) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);



    if (photos.length === 0) {
        return (
            <div className="text-center py-20 text-stone-400">
                Nessuna foto presente.
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <motion.div
                layout
                className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4"
            >
                <AnimatePresence>
                    {photos.map((photo, index) => (
                        <motion.div
                            layout
                            key={photo.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-zoom-in bg-stone-100"
                            onClick={() => setSelectedPhoto(photo)}
                            layoutId={`photo-${photo.id}`}
                        >

                            {photo.type === 'video' ? (
                                <video
                                    src={photo.url}
                                    className="w-full h-full object-cover"
                                    muted
                                    loop
                                    playsInline
                                    // autoPlay - Disable autoplay for performance in grid if many
                                    onMouseOver={(e) => e.currentTarget.play()}
                                    onMouseOut={(e) => e.currentTarget.pause()}
                                />
                            ) : (
                                <Image
                                    src={photo.url}
                                    alt={photo.caption}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                                />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-xs font-medium truncate">{photo.caption}</p>
                                {photo.category && (
                                    <span className="text-[10px] uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded-full mt-1 inline-block backdrop-blur-sm">
                                        {photo.category}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-[60]"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={32} />
                        </button>

                        <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
                            <motion.div
                                layoutId={`photo-${selectedPhoto.id}`}
                                className="relative max-h-[85vh] max-w-[95vw] pointer-events-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {selectedPhoto.type === 'video' ? (
                                    <video
                                        src={selectedPhoto.url}
                                        controls
                                        autoPlay
                                        className="max-h-[85vh] max-w-full object-contain rounded-sm shadow-2xl"
                                    />
                                ) : (
                                    <img
                                        src={selectedPhoto.url}
                                        alt={selectedPhoto.caption}
                                        className="max-h-[85vh] max-w-full object-contain rounded-sm shadow-2xl"
                                    />
                                )}
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-6 text-white/90 text-lg font-medium text-center"
                            >
                                {selectedPhoto.caption}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
