import {
    generateRegistrationOptions,
    verifyRegistrationResponse,
    generateAuthenticationOptions,
    verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { db } from './db';
import { users, authenticators } from './schema';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';

// Domain and RP ID
// RP_ID and ORIGIN are now determined dynamically per-request using headers() to support Vercel Previews & Custom Domains.
const RP_NAME = 'Portfolio Admin';

// Helper to determine current origin/RP_ID
async function getDomainInfo() {
    const cookieStore = await cookies();
    const headersList = await import("next/headers").then(mod => mod.headers());
    // Fix: Prefer x-forwarded-host to get the public alias instead of internal Vercel URL
    const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
    // If local, http. If vercel/prod, https.
    const protocol = host.includes("localhost") ? "http" : "https";
    const origin = `${protocol}://${host}`;
    // RP_ID is just the hostname (no port if possible, strictly it should be effective domain)
    // For localhost:3000, RPID is "localhost". For domain.com, it's "domain.com".
    const rpID = host.split(":")[0];
    // console.log("Domain Info:", { rpID, origin, host }); // Debug log
    return { rpID, origin };
}

export async function getRegistrationOptions(email: string) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if (!user) throw new Error("User not found");
    if (!user.id) throw new Error("User ID is undefined"); // Should not happen with schema, but safety first

    const userAuthenticators = await db.select().from(authenticators).where(eq(authenticators.userId, user.id));

    const userIDBuffer = Buffer.from(String(user.id)); // Explicit string conversion

    const { rpID } = await getDomainInfo();

    const options = await generateRegistrationOptions({
        rpName: RP_NAME,
        rpID,
        userID: new Uint8Array(userIDBuffer),
        userName: user.email,
        excludeCredentials: userAuthenticators.map(auth => ({
            id: auth.credentialID,
            transports: auth.transports ? JSON.parse(auth.transports) : undefined,
        })),
        authenticatorSelection: {
            residentKey: 'preferred',
            userVerification: 'preferred',
            authenticatorAttachment: 'platform',
        },
    });

    const cookieStore = await cookies();
    cookieStore.set('webauthn_challenge', options.challenge, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 5 });

    return options;
}

export async function verifyRegistration(email: string, response: any) {
    const cookieStore = await cookies();
    const expectedChallenge = cookieStore.get('webauthn_challenge')?.value;

    if (!expectedChallenge) throw new Error("Challenge expired");

    const { rpID, origin } = await getDomainInfo();

    const verification = await verifyRegistrationResponse({
        response,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
    });

    if (verification.verified && verification.registrationInfo) {
        const user = await db.query.users.findFirst({ where: eq(users.email, email) });
        if (!user) throw new Error("User not found");

        const info = verification.registrationInfo as any;

        let credentialPublicKey = info.credentialPublicKey;
        let credentialID = info.credentialID;
        let counter = info.counter;

        // Handle nested structure (e.g., info.credential.publicKey)
        if (!credentialPublicKey && info.credential) {
            credentialPublicKey = info.credential.publicKey;
            credentialID = info.credential.id;
            // counter might be in info.credential.counter or just 0
            if (counter === undefined) counter = info.credential.counter;
        }

        // Fallback: Use client response ID if still missing
        if (!credentialID && response.id) {
            credentialID = Buffer.from(response.id, 'base64url');
        }

        // Default counter if missing (safe as per schema default)
        if (counter === undefined) counter = 0;

        if (!credentialPublicKey) {
            const keys = Object.keys(info || {});
            const credKeys = info.credential ? Object.keys(info.credential) : [];
            console.error("WebAuth Missing PubKey (Deep search):", JSON.stringify(verification, null, 2));
            throw new Error(`Errore: Chiave pubblica mancante. Disponibili: ${keys.join(', ')} | CredentialKeys: ${credKeys.join(', ')}`);
        }

        if (!credentialID) {
            throw new Error("Errore: ID Credenziale mancante (dopo fallback).");
        }

        const pubKeyBuffer = Buffer.from(credentialPublicKey);
        const credIdBuffer = Buffer.from(credentialID);

        // Ensure ID is base64url for consistency
        const finalCredId = credIdBuffer.toString('base64url');

        await db.insert(authenticators).values({
            credentialID: finalCredId,
            credentialPublicKey: pubKeyBuffer.toString('base64'),
            counter,
            // Fix: transports is on the top-level response object, not nested
            // Default to ['internal'] if missing, since we enforce platform attachment
            transports: JSON.stringify(response.transports || ['internal']),
            userId: user.id,
        });

        return true;
    }
    console.error("WebAuthn Verification Failed:", JSON.stringify(verification, null, 2));
    return false;
}

export async function getAuthenticationOptions(email: string) {
    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user) throw new Error("User not found");

    const userAuthenticators = await db.select().from(authenticators).where(eq(authenticators.userId, user.id));

    if (userAuthenticators.length === 0) {
        throw new Error("No passkeys registered");
    }

    const { rpID } = await getDomainInfo();
    const options = await generateAuthenticationOptions({
        rpID,
        allowCredentials: userAuthenticators.map(auth => ({
            id: auth.credentialID,
            // Fallback to ['internal'] if no transports are stored (fixes previously malformed keys)
            transports: (auth.transports && JSON.parse(auth.transports).length > 0)
                ? JSON.parse(auth.transports)
                : ['internal'],
        })),
        userVerification: 'required',
    });

    const cookieStore = await cookies();
    cookieStore.set('webauthn_challenge', options.challenge, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 5 });

    return options;
}

export async function verifyAuthentication(email: string, response: any) {
    const cookieStore = await cookies();
    const expectedChallenge = cookieStore.get('webauthn_challenge')?.value;
    if (!expectedChallenge) throw new Error("Challenge expired");

    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (!user) throw new Error("User not found");

    const credentialID = response.id; // This is a base64url string from client response usually

    const authenticator = await db.query.authenticators.findFirst({
        where: eq(authenticators.credentialID, credentialID)
    });

    if (!authenticator) throw new Error("Authenticator not found");

    // Prepare authenticator object for verification
    // @simplewebauthn/server expects buffers/uint8arrays
    const authObj = {
        credentialPublicKey: new Uint8Array(Buffer.from(authenticator.credentialPublicKey, 'base64')),
        credentialID: Buffer.from(authenticator.credentialID, 'base64url'), // Decode back to buffer
        counter: authenticator.counter,
        transports: authenticator.transports ? JSON.parse(authenticator.transports) : undefined,
    };

    const { rpID, origin } = await getDomainInfo();

    const verification = await verifyAuthenticationResponse({
        response,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: {
            credentialPublicKey: new Uint8Array(Buffer.from(authenticator.credentialPublicKey, 'base64')),
            credentialID: Buffer.from(authenticator.credentialID, 'base64url'),
            counter: authenticator.counter,
            transports: authenticator.transports ? JSON.parse(authenticator.transports) : undefined,
        },
    } as any);

    if (verification.verified) {
        await db.update(authenticators)
            .set({ counter: verification.authenticationInfo.newCounter })
            .where(eq(authenticators.credentialID, credentialID));

        return true;
    }
    return false;
}
