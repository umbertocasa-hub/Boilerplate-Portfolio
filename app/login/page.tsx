import { checkHasUsers } from '@/lib/auth';
import { LoginForm } from '@/components/LoginForm';

export const metadata = {
    title: "Login Admin",
};

export const dynamic = 'force-dynamic';

export default async function LoginPage() {
    // Check if user exists to toggle between Setup and Login mode
    const hasUsers = await checkHasUsers();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">{hasUsers ? "Accesso Admin" : "Configurazione Iniziale"}</h1>
                    <p className="text-stone-500">
                        {hasUsers
                            ? "Inserisci le credenziali per gestire il portfolio."
                            : "Crea il tuo account amministratore sicuro."}
                    </p>
                </div>

                <LoginForm hasUsers={hasUsers} />
            </div>
        </div>
    );
}
