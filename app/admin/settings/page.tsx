import { updateCredentialsAction, updateSmtpAction } from "@/lib/actions";
import { getSmtpSettings } from "@/lib/mail";
import { get2FADetails } from "@/lib/auth2fa";
import { getUser } from "@/lib/auth";
import { TwoFactorSetup } from "@/components/TwoFactorSetup";
import { BiometricSetup, type Authenticator } from "@/components/BiometricSetup";

export const metadata = {
    title: "Admin Settings",
};

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    let smtpSettings, twoFactorDetails, user;
    let authenticators: Authenticator[] = [];
    let error = null;

    try {
        smtpSettings = await getSmtpSettings();
        twoFactorDetails = await get2FADetails("admin@example.com");
        twoFactorDetails = await get2FADetails("admin@example.com");
        user = await getUser("admin@example.com");

        // Fetch authenticators
        const { db } = await import("@/lib/db");
        const { authenticators: authenticatorsSchema } = await import("@/lib/schema");
        const { eq } = await import("drizzle-orm");

        authenticators = await db.select().from(authenticatorsSchema).where(eq(authenticatorsSchema.userId, user!.id));
    } catch (e: any) {
        console.error("Settings page error:", e);
        error = e.message || "Unknown error";
        // Provide defaults to allow partial rendering
        smtpSettings = { host: "", port: 587, user: "", pass: "", secure: false };
        twoFactorDetails = { isEnabled: false };
        authenticators = [];
    }

    const twoFactorEnabled = twoFactorDetails?.isEnabled || false;

    if (error) {
        return (
            <div className="p-6 bg-red-50 text-red-900 rounded-xl border border-red-200">
                <h2 className="text-xl font-bold mb-2">Errore Caricamento</h2>
                <p>Si è verificato un errore nel caricamento delle impostazioni:</p>
                <code className="block mt-2 p-2 bg-red-100 rounded text-sm font-mono">{error}</code>
                <p className="mt-4 text-sm">Controlla la connessione al database o i log del server.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-2xl">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold tracking-tight">Impostazioni Sicurezza</h1>
                <p className="text-stone-500">Gestisci credenziali e notifiche email.</p>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Aggiorna Credenziali</h2>
                <form action={updateCredentialsAction} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Password Attuale</label>
                        <input
                            type="password"
                            name="currentPassword"
                            required
                            className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Nuova Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                required
                                minLength={8}
                                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Nuovo PIN</label>
                            <input
                                type="password"
                                name="newPin"
                                required
                                pattern="[0-9]*"
                                inputMode="numeric"
                                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors"
                        >
                            Salva Nuove Credenziali
                        </button>
                    </div>
                </form>
            </div>


            <div className="grid grid-cols-1 gap-8">
                <div className="bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Sicurezza Avanzata</h2>
                    <div className="space-y-8">
                        <div>
                            <TwoFactorSetup isEnabled={twoFactorEnabled} />
                        </div>
                        <hr className="border-stone-100 dark:border-stone-800" />
                        <div>
                            <BiometricSetup authenticators={authenticators} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-stone-900 p-6 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Configurazione Email (SMTP)</h2>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">Configura un account email per ricevere avvisi di sicurezza.</p>

                <form action={updateSmtpAction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Host SMTP</label>
                            <input
                                type="text"
                                name="host"
                                defaultValue={smtpSettings.host}
                                placeholder="smtp.gmail.com"
                                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Porta</label>
                            <input
                                type="number"
                                name="port"
                                defaultValue={smtpSettings.port}
                                placeholder="587"
                                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Utente (Email)</label>
                            <input
                                type="email"
                                name="user"
                                defaultValue={smtpSettings.user}
                                placeholder="tuoindirizzo@gmail.com"
                                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">Password (o App Password)</label>
                            <input
                                type="password"
                                name="pass"
                                defaultValue={smtpSettings.pass}
                                placeholder="••••••••"
                                className="w-full px-3 py-2 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="bg-stone-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-black dark:bg-white dark:text-black dark:hover:bg-stone-200 transition-colors"
                        >
                            Salva Configurazione Email
                        </button>
                    </div>
                </form>
            </div>

            {/* We can check searchParams for success/error handling in a client component or simple conditional rendering if we switch to client component.
                For now keeping it simple server component. */}
        </div>

    );
}
