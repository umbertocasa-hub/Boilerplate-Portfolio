import { addProjectAction, deleteProjectAction } from "@/lib/actions";
import { getProjects } from "@/lib/data";
import { Trash2 } from "lucide-react";
import { AdminSubmitButton } from "@/components/AdminSubmitButton";

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="max-w-xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold">Aggiungi Progetto</h1>
                    <p className="text-stone-500">Inserisci i dettagli del nuovo progetto.</p>
                </div>

                <form action={addProjectAction} className="space-y-6 bg-white dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-800">

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Titolo</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Nome progetto"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Descrizione</label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Descrivi cosa hai fatto..."
                            required
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tipo Progetto</label>
                        <select
                            name="category"
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        >
                            <option value="project">Progetto Personale</option>
                            <option value="ios">App iOS / Lavoro</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Link (Opzionale)</label>
                        <input
                            type="url"
                            name="link"
                            placeholder="https://..."
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tags (separati da virgola)</label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="React, AWS, Linux"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Immagine (Opzionale)</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="block w-full text-sm text-stone-500 dark:text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-700 dark:file:text-stone-200 hover:file:bg-stone-200 dark:hover:file:bg-stone-700"
                        />
                    </div>

                    <AdminSubmitButton text="Salva Progetto" loadingText="Salvataggio in corso..." />
                </form>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Progetti Esistenti</h2>
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div key={project.id} className="flex items-start justify-between p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">{project.title}</h3>
                                    {project.category === 'ios' && (
                                        <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] rounded-full uppercase font-bold tracking-wider">
                                            iOS / Lavoro
                                        </span>
                                    )}
                                </div>
                                <p className="text-stone-600 dark:text-stone-400 text-sm max-w-lg">{project.description}</p>
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <form action={deleteProjectAction.bind(null, project.id)}>
                                <button
                                    type="submit"
                                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                    title="Elimina Progetto"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
                {projects.length === 0 && (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-10">Nessun progetto presente.</p>
                )}
            </div>
        </div>
    );
}
