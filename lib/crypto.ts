import crypto from 'crypto';

// Use environment variable for the key. 
// If not set, we'll try to use a default or throw, but for now fallback to a temporary random one which is bad but prevents crash if unused.
// In production, MASTER_KEY *must* be set.

const ALGORITHM = 'aes-256-cbc';

function getMasterKey(): Buffer {
    const envKey = process.env.MASTER_KEY;
    if (envKey) {
        // Expect hex string or just string? Let's handle hex string for consistency.
        // If 64 hex chars = 32 bytes
        if (envKey.length === 64) {
            return Buffer.from(envKey, 'hex');
        }
        // If not hex, maybe raw string? Pad/slice to 32 bytes.
        // Better to force hex.
        try {
            return Buffer.from(envKey, 'hex');
        } catch {
            // Fallback below
        }
    }

    // Fallback for dev/first run if env not set (will break persistence of encrypted data across restarts if not set)
    // FIX: Using a static fallback key to ensure persistence on Vercel even if env var is missing.
    // This allows SMTP settings to survive serverless cold starts.
    const staticFallback = "66c19060206fa406ab6de9d758e677eb33f3de9fe6b3b0f61f7041b12f6fd900";
    console.warn("MASTER_KEY not set. Using static fallback key.");
    return Buffer.from(staticFallback, 'hex');
}

const key = getMasterKey();

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Return IV:Encrypted
    return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift() || '', 'hex');
    const encryptedText = parts.join(':');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
