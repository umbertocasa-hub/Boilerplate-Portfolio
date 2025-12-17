// Singleton for the pipeline
let classifier: any = null;

export async function classifyImage(buffer: Buffer, filepath?: string): Promise<{ category: string; tags: string[] }> {
    // Dynamic import to prevent cold start crashes in serverless
    const { pipeline, RawImage } = await import('@xenova/transformers');

    if (!classifier) {
        // Use a lightweight, effective model for general classification
        classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
    }

    try {
        // Optimization: Resize image using Sharp
        let processBuffer = buffer;
        try {
            const sharp = (await import('sharp')).default;
            processBuffer = await sharp(buffer)
                .resize({ width: 800, withoutEnlargement: true })
                .toFormat('jpeg') // ensure jpeg
                .toBuffer();
        } catch (e) {
            console.warn("Sharp resize failed, using original buffer:", e);
        }

        // Use RawImage.read which accepts a Buffer directly!
        // Create a data URL from the buffer
        const base64 = processBuffer.toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64}`;

        const image = await RawImage.read(dataUrl);
        const output = await classifier(image);

        console.log("Raw AI Output:", JSON.stringify(output, null, 2));
        // Output is like [{ label: 'sports car', score: 0.9 }, ...]

        const tags = output.map((item: any) => item.label);
        const category = mapLabelToCategory(tags);

        return { category, tags };
    } catch (error) {
        console.error("Classification failed:", error);
        return { category: 'Altro', tags: [] };
    }
}

function mapLabelToCategory(labels: string[]): string {
    // Simple heuristic
    const autoKeywords = ['car', 'vehicle', 'wheel', 'motor', 'convertible', 'sports car', 'racer', 'jeep', 'limousine', 'minivan', 'truck', 'coupe', 'sedan', 'suv', 'grille', 'bumper', 'r8', 'audi', 'ferrari', 'lamborghini', 'porsche', 'bmw', 'mercedes'];
    const landscapeKeywords = ['mountain', 'valley', 'alp', 'lakeside', 'seashore', 'beach', 'ocean', 'cliff', 'forest', 'nature', 'sky', 'volcano'];

    // Check top labels against keywords
    for (const label of labels) {
        const lower = label.toLowerCase();
        if (autoKeywords.some(k => lower.includes(k))) return 'Auto';
        if (landscapeKeywords.some(k => lower.includes(k))) return 'Paesaggi';
    }

    return 'Altro';
}
