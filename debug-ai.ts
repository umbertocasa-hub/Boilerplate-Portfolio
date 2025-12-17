import { classifyImage } from './lib/classify';
import fs from 'fs/promises';
import path from 'path';

async function run() {
    const filename = "1765811324643-1763994667889.jpg";
    const filepath = path.join(process.cwd(), "public", "uploads", filename);

    console.log(`Reading file: ${filepath}`);
    try {
        const buffer = await fs.readFile(filepath);
        console.log(`File read, size: ${buffer.length}`);

        console.log("Running classification...");
        const result = await classifyImage(buffer, filepath);
        console.log("Result:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
