"use server";

import { addPhoto, addProject, deletePhoto, deleteProject, getPhotos, updatePhoto } from "@/lib/data";
import { Photo, Project } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";
import { classifyImage } from "@/lib/classify";
import fs from "fs/promises";
import { cookies } from "next/headers";

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    if (!token) {
        throw new Error("Unauthorized");
    }
}

export async function uploadPhotoAction(formData: FormData) {
    await checkAuth();

    const file = formData.get("file") as File;
    const caption = formData.get("caption") as string;

    if (!file || file.size === 0) {
        throw new Error("No file uploaded");
    }

    const buffer = Buffer.from(await file.arrayBuffer() as ArrayBuffer);

    // Process image: Resize & Optimize to prevent DB bloat
    const { optimizeImage } = await import('@/lib/image-optimization');
    const { buffer: optimizedBuffer, mimeType: finalMimeType } = await optimizeImage(buffer);

    // Convert to Data URL (or upload to Blob Storage if we had one, but storing in DB as Base64 for now per architecture)
    const base64 = optimizedBuffer.toString('base64');
    const mimeType = finalMimeType; // 'image/webp'
    // Using simple detection or defaulting to webp if optimized
    // const dataUrl = `data:${file.type.startsWith('image') ? 'image/webp' : file.type};base64,${base64}`;
    const dataUrl = `data:${mimeType};base64,${base64}`;

    const isVideo = file.type.startsWith('video/');
    let category = 'Altro';
    let tags: string[] = [];

    if (!isVideo) {
        // AI Classification disabled for Vercel Free Tier performance/memory stability
        // Uncomment to re-enable if resources allow
        /*
        try {
            const { classifyImage } = await import('@/lib/classify');
            const result = await classifyImage(optimizedBuffer);
            category = result.category;
            tags = result.tags;
        } catch (e) {
            console.error("AI Classification failed", e);
        }
        */
    } else {
        category = 'Video';
    }

    const photo: Photo = {
        id: crypto.randomUUID(),
        url: dataUrl, // Storing Base64 directly
        caption,
        createdAt: new Date().toISOString(),
        type: isVideo ? 'video' : 'image',
        mimeType: isVideo ? file.type : 'image/webp',
        category,
        tags,
    };

    await addPhoto(photo);
    revalidatePath("/photography");
    revalidatePath("/");
    redirect("/admin/photography");
}

export async function deletePhotoAction(id: string, _formData?: FormData) {
    await checkAuth();
    await deletePhoto(id);
    // No file to delete
    revalidatePath("/photography");
    revalidatePath("/admin/photography");
    revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
    await checkAuth();
    await deleteProject(id);
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");
}

export async function addProjectAction(formData: FormData) {
    await checkAuth();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const category = formData.get("category") as string;
    const tagsString = formData.get("tags") as string;
    const file = formData.get("image") as File;

    let imageUrl = "";
    if (file && file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer() as ArrayBuffer);
        // Optimize for DB
        try {
            const sharp = (await import('sharp')).default;
            const optimized = await sharp(buffer)
                .resize({ width: 800, withoutEnlargement: true })
                .toFormat('webp', { quality: 80 })
                .toBuffer();
            imageUrl = `data:image/webp;base64,${optimized.toString('base64')}`;
        } catch (e) {
            // Fallback
            imageUrl = `data:${file.type};base64,${buffer.toString('base64')}`;
        }
    }

    const project: Project = {
        id: crypto.randomUUID(),
        title,
        description,
        link: link || "#",
        category: category || "project",
        tags: tagsString.split(",").map(t => t.trim()).filter(Boolean),
        imageUrl,
        createdAt: new Date().toISOString(),
    };

    await addProject(project);
    revalidatePath("/projects");
    revalidatePath("/");
    redirect("/projects");
}

export async function reclassifyAllPhotosAction() {
    await checkAuth();
    const photos = await getPhotos();
    const publicDir = path.join(process.cwd(), "public");

    for (const photo of photos) {
        if (photo.type === 'video') continue;

        try {
            const filePath = path.join(publicDir, photo.url);
            // Check if file exists
            try {
                await fs.access(filePath);
            } catch {
                console.warn(`File not found for photo ${photo.id}: ${filePath}`);
                continue;
            }

            const buffer = await fs.readFile(filePath);
            const result = await classifyImage(buffer, filePath);

            // Update photo in memory/db
            const updatedPhoto = { ...photo, category: result.category, tags: result.tags };
            await updatePhoto(updatedPhoto);
        } catch (error) {
            console.error(`Failed to reclassify photo ${photo.id}:`, error);
        }
    }

    revalidatePath("/photography");
    revalidatePath("/admin/photography");
    revalidatePath("/");
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    redirect("/");
}

export async function updateCredentialsAction(formData: FormData) {
    await checkAuth();

    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const newPin = formData.get("newPin") as string;
    const email = "admin@example.com";

    // Dynamically import
    const { verifyPassword, updateUserCredentials } = await import("@/lib/auth");

    const isValid = await verifyPassword(email, currentPassword);
    if (!isValid) {
        redirect("/admin/settings?error=InvalidPassword");
    }

    await updateUserCredentials(email, newPassword, newPin);

    // Send email alert
    try {
        const { sendSecurityAlert } = await import("@/lib/mail");
        await sendSecurityAlert('PASSWORD', email);
    } catch (e) {
        console.error("Failed to send alert:", e);
    }

    redirect("/admin/settings?success=true");
}

export async function updateSmtpAction(formData: FormData) {
    await checkAuth();

    const host = formData.get("host") as string;
    const port = parseInt(formData.get("port") as string);
    const user = formData.get("user") as string;
    const rawPass = formData.get("pass") as string;
    const pass = rawPass.replace(/\s/g, ''); // Remove spaces from App Password
    // const secure = formData.get("secure") === "on"; // simplified, assume 465=secure or auto

    const settings = {
        host,
        port,
        user,
        pass,
        secure: port === 465
    };

    const { updateSmtpSettings } = await import("@/lib/mail");
    await updateSmtpSettings(settings);

    redirect("/admin/settings?smtpSuccess=true");
}

export async function generate2fSetupAction() {
    await checkAuth();
    const { generate2FA } = await import("@/lib/auth2fa");
    const email = "admin@example.com";
    return await generate2FA(email);
}

export async function verify2faSetupAction(secret: string, token: string) {
    await checkAuth();
    const { verify2FAToken, enable2FAForUser } = await import("@/lib/auth2fa");

    // Verify
    const isValid = verify2FAToken(token, secret);
    if (!isValid) return { success: false, message: "Codice non valido" };

    const email = "admin@example.com";
    await enable2FAForUser(email, secret);

    revalidatePath("/admin/settings");
    return { success: true };
}

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const pin = formData.get('pin') as string;
    const token = formData.get('token') as string;

    try {
        const { authenticateUser } = await import('@/lib/auth');
        const isValid = await authenticateUser(email, password, pin, token);

        if (isValid) {
            const cookieStore = await cookies();
            cookieStore.set('auth_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return { success: true };
        } else {
            return { success: false, message: "Credenziali non valide" };
        }
    } catch (e: any) {
        console.error("Login Action Error:", e);
        return {
            success: false,
            message: `Errore Server: ${e.message || "Sconosciuto"}`
        };
    }
}

export async function setupAction(formData: FormData) {
    try {
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const pin = formData.get('pin') as string;

        const { registerFirstUser } = await import('@/lib/auth');

        await registerFirstUser(email, password, pin);

        const cookieStore = await cookies();
        cookieStore.set('auth_token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });
        return { success: true };
    } catch (e: any) {
        return { success: false, message: `Errore Configurazione: ${e.message || "Imprevisto"}` };
    }
}

// --- WEBAUTHN ACTIONS ---

export async function generateRegistrationOptionsAction() {
    await checkAuth();
    const { getRegistrationOptions } = await import("@/lib/auth-webauthn");
    // In a real app, we get user from session. Here we assume the single user email.
    const email = "admin@example.com";
    try {
        const options = await getRegistrationOptions(email);
        return { success: true, options };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
}

export async function verifyRegistrationAction(response: any) {
    await checkAuth();
    const { verifyRegistration } = await import("@/lib/auth-webauthn");
    const email = "admin@example.com";
    try {
        const verified = await verifyRegistration(email, response);
        if (verified) {
            revalidatePath("/admin/settings");
            return { success: true };
        }
        return { success: false, message: "Verifica fallita" };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
}

export async function generateAuthenticationOptionsAction(email: string) {
    // No auth check needed for login
    const { getAuthenticationOptions } = await import("@/lib/auth-webauthn");
    try {
        const options = await getAuthenticationOptions(email);
        return { success: true, options };
    } catch (e: any) {
        console.error("WebAuthn Gen Auth Error:", e);
        return { success: false, message: "User not found or no passkeys" };
    }
}

export async function verifyAuthenticationAction(email: string, response: any) {
    const { verifyAuthentication } = await import("@/lib/auth-webauthn");
    try {
        const verified = await verifyAuthentication(email, response);
        if (verified) {
            const cookieStore = await cookies();
            cookieStore.set('auth_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return { success: true };
        }
        return { success: false, message: "Verifica fallita" };
    } catch (e: any) {
        console.error("WebAuthn Verify Auth Error:", e);
        return { success: false, message: e.message };
    }
}

export async function deletePasskeyAction(credentialID: string) {
    await checkAuth();
    const { authenticators } = await import("@/lib/schema");
    const { db } = await import("@/lib/db");
    const { eq } = await import("drizzle-orm");

    try {
        await db.delete(authenticators).where(eq(authenticators.credentialID, credentialID));
        revalidatePath("/admin/settings");
        return { success: true };
    } catch (e: any) {
        return { success: false, message: e.message };
    }
}

// --- CONTACT ACTION ---
export async function sendContactEmailAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, message: "Compila tutti i campi." };
    }

    try {
        const { getSmtpSettings } = await import("@/lib/mail");
        const settings = await getSmtpSettings();

        if (!settings.user || !settings.host) {
            return { success: false, message: "Il sistema di posta non è configurato." };
        }

        const nodemailer = (await import("nodemailer")).default;

        const transporter = nodemailer.createTransport({
            host: settings.host,
            port: settings.port,
            secure: settings.secure,
            auth: {
                user: settings.user,
                pass: settings.pass,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${settings.user}>`,
            to: "admin@example.com",
            replyTo: email,
            subject: `New Message from ${name}`,
            text: message,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>New Contact Message</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <hr/>
                    <p>${message.replace(/\n/g, '<br/>')}</p>
                </div>
            `
        });

        return { success: true };
    } catch (e: any) {
        console.error("Contact Form Error:", e);
        return { success: false, message: "Errore nell'invio del messaggio." };
    }
}
