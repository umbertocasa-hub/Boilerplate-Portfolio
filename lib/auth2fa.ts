import { authenticator } from 'otplib';
import qrcode from 'qrcode';
import { db } from './db';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export async function generate2FA(email: string) {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, 'Portfolio Admin', secret);
    const imageUrl = await qrcode.toDataURL(otpauth);
    return { secret, imageUrl };
}

export function verify2FAToken(token: string, secret: string) {
    // Basic verification without DB
    if (!token || !secret) return false;
    try {
        return authenticator.check(token, secret);
    } catch (e) {
        return false;
    }
}

// Separate management function to enable 2FA for user
export async function enable2FAForUser(email: string, secret: string) {
    await db.update(users).set({
        isTwoFactorEnabled: true,
        twoFactorSecret: secret
    }).where(eq(users.email, email));
}

// Get 2FA secret to verify login
export async function get2FADetails(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = result[0];
    if (!user) return null;

    return {
        isEnabled: !!user.isTwoFactorEnabled,
        secret: user.twoFactorSecret
    };
}
