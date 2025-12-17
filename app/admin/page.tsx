import Link from 'next/link';
import { Camera, Terminal, Plus, Lock, Settings } from 'lucide-react';

export const metadata = {
    title: "Admin Dashboard",
};

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-stone-500">Benvenuto nel pannello di amministrazione. Seleziona un'attività qui sotto.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Link href="/admin/photography" className="group p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-4">
                    <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full group-hover:bg-white dark:group-hover:bg-stone-700 transition-colors">
                        <Camera size={24} className="text-stone-700 dark:text-stone-300" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-stone-900 dark:text-white">
                            Gestisci Foto <Plus size={16} className="text-stone-400" />
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400">Carica nuove foto nella galleria.</p>
                    </div>
                </Link>

                <Link href="/admin/projects" className="group p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-4">
                    <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full group-hover:bg-white dark:group-hover:bg-stone-700 transition-colors">
                        <Terminal size={24} className="text-stone-700 dark:text-stone-300" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-stone-900 dark:text-white">
                            Gestisci Progetti <Plus size={16} className="text-stone-400" />
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400">Aggiungi nuovi progetti sistemistici o dev.</p>
                    </div>
                </Link>
                <Link href="/admin/settings" className="group p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-4">
                    <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-full group-hover:bg-white dark:group-hover:bg-stone-700 transition-colors">
                        <Lock size={24} className="text-stone-700 dark:text-stone-300" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-stone-900 dark:text-white">
                            Sicurezza <Settings size={16} className="text-stone-400" />
                        </h2>
                        <p className="text-stone-500 dark:text-stone-400">Cambia password e PIN di accesso.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
