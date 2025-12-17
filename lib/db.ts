import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

if (!connectionString) {
    console.error("❌ DATABASE_URL MISSING - Using dummy connection for build/init");
}

// Fallback to avoid build/init crash. 
// Runtime queries will fail nicely if URL is missing.
const sql = neon(connectionString || "postgres://dummy:dummy@localhost/dummy");
export const db = drizzle(sql, { schema });
