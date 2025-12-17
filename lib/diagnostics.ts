"use server";

import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function checkSystemStatus() {
    const envVar = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
    const isSet = !!envVar;
    const maskedUrl = isSet ? `${envVar.substring(0, 15)}...` : "NOT SET";

    let dbStatus = "Unknown";
    let dbError = null;

    try {
        await db.execute(sql`SELECT 1`);
        dbStatus = "Connected";
    } catch (e: any) {
        dbStatus = "Error";
        dbError = e.message;
    }

    return {
        isSet,
        maskedUrl,
        dbStatus,
        dbError
    };
}
