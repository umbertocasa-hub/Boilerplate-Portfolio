export default function NiceTryPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
            <h1 className="text-6xl font-bold mb-6">🔒 ACCESSO NEGATO</h1>
            <p className="text-2xl mb-8">
                Ci hai provato ahahah furbacchione! 😉
            </p>
            <p className="text-stone-500 max-w-md">
                Questo sistema è protetto. Il tuo tentativo è stato registrato.
                Nessuno può entrare tranne l'amministratore.
            </p>
            <div className="mt-12 text-4xl animate-bounce">
                👮‍♂️ 🚫 💻
            </div>
        </div>
    );
}
