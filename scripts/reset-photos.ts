import { db } from '../lib/db';
import { photos } from '../lib/schema';

async function main() {
    console.log("Deleting all photos...");
    try {
        await db.delete(photos);
        console.log("Successfully deleted all photos.");
    } catch (e) {
        console.error("Error deleting photos:", e);
    }
    process.exit(0);
}

main();
