import { db } from './db';
import { users } from './schema';
import { eq, count } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

// Constants
const SALT_ROUNDS = 10;

/**
 * Checks if any users exist in the database (for initial setup flow).
 */
export async function checkHasUsers(): Promise<boolean> {
    try {
        const result = await db.select({ count: count() }).from(users);
        return result[0].count > 0;
    } catch (e) {
        console.error("Database check failed:", e);
        return false;
    }
}

/**
 * Creates the initial admin user.
 */
export async function registerFirstUser(email: string, password: string, pin: string) {
    // ONE-SHOT MODE: Delete existing user to allow re-registration
    await db.delete(users).where(eq(users.email, email));

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const pinHash = await bcrypt.hash(pin, SALT_ROUNDS);

    await db.insert(users).values({
        email,
        passwordHash,
        pinHash,
        isTwoFactorEnabled: false,
    });

    return true;
}

/**
 * Authenticates a user with Email, Password, PIN, and optional 2FA token.
 */
export async function authenticateUser(email: string, password: string, pin: string, token?: string): Promise<boolean> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = result[0];

    if (!user) return false;

    // 1. Check Password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) return false;

    // 2. Check PIN
    const isPinValid = await bcrypt.compare(pin, user.pinHash);
    if (!isPinValid) return false;

    // 3. Check 2FA if enabled
    if (user.isTwoFactorEnabled) {
        if (!token) return false;

        const { verify2FAToken } = await import('./auth2fa');
        if (!user.twoFactorSecret) return false;
        const isValid = verify2FAToken(token, user.twoFactorSecret);
        if (!isValid) return false;
    }

    return true;
}

/**
 * Updates user credentials (password and PIN).
 */
export async function updateUserCredentials(email: string, newPassword?: string, newPin?: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = result[0];
    if (!user) throw new Error("User not found");

    const updates: any = { updatedAt: new Date() };

    if (newPassword) {
        updates.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    }

    if (newPin) {
        updates.pinHash = await bcrypt.hash(newPin, SALT_ROUNDS);
    }

    await db.update(users).set(updates).where(eq(users.email, email));
}

/**
 * Helper to verify just the password (for settings changes).
 */
export async function verifyPassword(email: string, password: string): Promise<boolean> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const user = result[0];
    if (!user) return false;
    return await bcrypt.compare(password, user.passwordHash);
}

/**
 * Get user details by email
 */
export async function getUser(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
}
