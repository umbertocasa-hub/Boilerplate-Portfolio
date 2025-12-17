"use client";

import { useState, useEffect } from "react";
import { checkSystemStatus } from "@/lib/diagnostics";

export function SystemStatus() {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSystemStatus().then(s => {
            setStatus(s);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="text-xs text-stone-500 mt-4">Checking system...</div>;

    if (!status) return null;

    return (
        <div className="mt-8 p-4 bg-stone-100 dark:bg-stone-900 rounded-lg text-xs font-mono border border-stone-200 dark:border-stone-800 w-full">
            <h3 className="font-bold mb-2 uppercase tracking-wider text-stone-500">System Diagnostics</h3>
            <div className="space-y-1">
                <div className="flex justify-between">
                    <span>ENV VAR:</span>
                    <span className={status.isSet ? "text-green-600" : "text-red-600 font-bold"}>
                        {status.isSet ? "DETECTED" : "MISSING"}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>DB CHECK:</span>
                    <span className={status.dbStatus === "Connected" ? "text-green-600" : "text-red-600 font-bold"}>
                        {status.dbStatus}
                    </span>
                </div>
                {status.dbError && (
                    <div className="mt-2 pt-2 border-t border-stone-200 text-red-600 break-all">
                        Error: {status.dbError}
                    </div>
                )}
            </div>
        </div>
    );
}
