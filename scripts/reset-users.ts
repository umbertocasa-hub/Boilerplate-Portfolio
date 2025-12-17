
import { db } from '../lib/db';
import { users } from '../lib/schema';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function reset() {
    console.log('🔄 Connecting to Neon DB...');
    try {
        await db.delete(users);
        console.log('✅ ALL USERS DELETED.');
        console.log('👉 Go to Vercel and refresh the login page. You should see "Configurazione Iniziale".');
        process.exit(0);
    } catch (e) {
        console.error('❌ Error resetting users:', e);
        process.exit(1);
    }
}
reset();
