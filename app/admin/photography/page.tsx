import { uploadPhotoAction, deletePhotoAction } from "@/lib/actions";
import { getPhotos } from "@/lib/data";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default async function AdminPhotographyPage() {
    const photos = await getPhotos();

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="max-w-xl mx-auto space-y-8">
                <div>
                    <h1 className="text-2xl font-bold">Carica Nuova Foto o Video</h1>
                    <p className="text-stone-500">Seleziona un&apos;immagine o un video e aggiungi una didascalia.</p>
                </div>

                <form action={uploadPhotoAction} className="space-y-6 bg-white dark:bg-stone-900 p-8 rounded-xl border border-stone-200 dark:border-stone-800">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Media (Foto o Video)</label>
                        <input
                            type="file"
                            name="file"
                            accept="image/*,video/*"
                            required
                            className="block w-full text-sm text-stone-500 dark:text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 dark:file:bg-stone-800 file:text-stone-700 dark:file:text-stone-200 hover:file:bg-stone-200 dark:hover:file:bg-stone-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Didascalia</label>
                        <input
                            type="text"
                            name="caption"
                            placeholder="Es. Tramonto sulle Alpi"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-black text-white font-medium py-2 rounded-lg hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors"
                        >
                            Carica Media
                        </button>
                    </div>
                </form>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Manutenzione AI</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        Se hai caricato foto prima dell&apos;integrazione AI, usa questo pulsante per analizzare e classificare tutte le foto esistenti.
                    </p>
                    <form action={async () => {
                        "use server";
                        const { reclassifyAllPhotosAction } = await import("@/lib/actions");
                        await reclassifyAllPhotosAction();
                    }}>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Rigenera Classificazione AI
                        </button>
                    </form>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold">Galleria Corrente</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {photos.map((photo) => (
                        <div key={photo.id} className="group relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden shadow-sm">
                            <div className="aspect-square relative">
                                {photo.type === 'video' ? (
                                    <video
                                        src={photo.url}
                                        className="w-full h-full object-cover"
                                        controls={false}
                                        muted
                                        loop // Preview loop
                                        playsInline
                                    />
                                ) : (
                                    <Image
                                        src={photo.url}
                                        alt={photo.caption}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="p-3">
                                <p className="text-sm font-medium truncate text-stone-700 dark:text-stone-300 mb-2">{photo.caption}</p>
                                <form action={deletePhotoAction.bind(null, photo.id)}>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-2 text-xs text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 py-2 rounded-md transition-colors"
                                    >
                                        <Trash2 size={14} />
                                        Elimina
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
                {photos.length === 0 && (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-10">Nessuna foto presente.</p>
                )}
            </div>
        </div>
    );
}
