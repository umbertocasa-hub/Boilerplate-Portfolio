import { getPhotos } from "@/lib/data";
import { PhotoGallery } from "@/components/PhotoGallery";
import { GearList } from "@/components/GearList";

export const metadata = {
    title: "Fotografia | Portfolio",
    description: "Galleria fotografica personale.",
};

export default async function PhotographyPage() {
    const photos = await getPhotos();

    return (
        <div className="space-y-12">
            <div className="space-y-4 mb-8">
                <h1 className="text-4xl font-bold tracking-tight">Variazioni di Luce e Motori</h1>
                <p className="text-lg text-stone-600 max-w-3xl leading-relaxed italic">
                    &quot;Catturare l&apos;essenza della velocità non è fermare il tempo, ma lasciare che il movimento stesso dipinga il frame.
                    Tra il rombo di un motore e il silenzio di uno scatto, cerco quella perfetta frazione di secondo dove
                    la meccanica diventa emozione e la luce racconta storie che le parole non sanno dire.&quot;
                </p>
            </div>

            <PhotoGallery photos={photos} />

            <GearList />
        </div>
    );
}
