import { getProjects } from "@/lib/data";
import { ProjectList } from "@/components/ProjectList";
import { TechStack } from "@/components/TechStack";
import { ExperienceRoadmap } from "@/components/ExperienceRoadmap";

export const metadata = {
    title: "Progetti | Portfolio",
    description: "I miei progetti di sviluppo e amministrazione sistemi.",
};

export default async function ProjectsPage() {
    const allProjects = await getProjects();

    const iosProjects = allProjects.filter(p => p.category === 'ios');
    const standardProjects = allProjects.filter(p => p.category !== 'ios');

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Progetti & Sistemi</h1>
                <p className="text-stone-500 max-w-2xl">
                    Sviluppo software, scripting e una roadmap dei miei progetti più corposi.
                </p>
            </div>

            <TechStack />

            {/* iOS / Works Section */}
            {iosProjects.length > 0 && (
                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight">Lavori & Pubblicazioni iOS</h2>
                        <p className="text-stone-500">Applicazioni pubblicate su App Store e progetti lavorativi.</p>
                    </div>
                    <ProjectList projects={iosProjects} />
                </div>
            )}

            <div className="space-y-6">
                <h2 className="text-2xl font-bold tracking-tight">Galleria Progetti Personali</h2>
                <ProjectList projects={standardProjects} />
            </div>

            <ExperienceRoadmap />
        </div>
    );
}
