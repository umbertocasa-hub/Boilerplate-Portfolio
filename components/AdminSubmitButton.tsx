"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    loadingText?: string;
}

export function AdminSubmitButton({
    text = "Salva",
    loadingText = "Salvataggio...",
    className,
    ...props
}: AdminSubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={cn(
                "flex items-center justify-center w-full bg-black text-white font-medium py-2 rounded-lg transition-colors hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {loadingText}
                </>
            ) : (
                text
            )}
        </button>
    );
}
