
import sharp from 'sharp';

/**
 * Optimizes an image buffer for storage.
 * - Resizes to max 1920px width/height (HD standard).
 * - Converts to WebP (superior compression).
 * - Quality 80 ensures great visual fidelity with minimal size.
 * - Strips metadata to save space.
 */
export async function optimizeImage(buffer: Buffer): Promise<{ buffer: Buffer; mimeType: string; width: number; height: number }> {
    try {
        const image = sharp(buffer);
        const metadata = await image.metadata();

        const resized = image
            .resize({
                width: 1920,
                height: 1920,
                fit: 'inside', // Preserves aspect ratio, max dimensions
                withoutEnlargement: true, // Don't upscale small images
            })
            .webp({ quality: 80, effort: 6 }); // Effort 6 = proper compression

        const optimizedBuffer = await resized.toBuffer();
        const { width, height } = await resized.metadata();

        return {
            buffer: optimizedBuffer,
            mimeType: 'image/webp', // Always converting to WebP
            width: width || 0,
            height: height || 0
        };
    } catch (error) {
        console.error("Image optimization failed:", error);
        throw new Error("Failed to optimize image");
    }
}
