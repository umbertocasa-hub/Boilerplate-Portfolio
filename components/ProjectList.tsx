"use client";

import { Project } from "@/lib/types";
import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

export function ProjectList({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-20 text-stone-400">
                Nessun progetto presente.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full hover:border-stone-200 dark:hover:border-stone-700"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg text-stone-700 dark:text-stone-300">
                            <Terminal size={24} />
                        </div>
                        {project.link && project.link !== "#" && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>

                    {project.imageUrl && (
                        <div className="mb-4 rounded-lg overflow-hidden border border-stone-100 dark:border-stone-800">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-6 flex-grow">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs rounded-full font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
