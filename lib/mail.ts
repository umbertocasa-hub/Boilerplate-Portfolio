import nodemailer from 'nodemailer';
import { db } from './db';
import { settings } from './schema';
import { encrypt, decrypt } from './crypto';
import { eq } from 'drizzle-orm';

interface SmtpSettings {
    host: string;
    port: number;
    user: string;
    pass: string;
    secure: boolean;
    isEncrypted?: boolean;
}

export async function sendSecurityAlert(type: 'PASSWORD' | 'PIN', emailTo: string = "admin@example.com") {
    try {
        const result = await db.select().from(settings).limit(1);
        const smtpSettings = result[0];

        if (!smtpSettings || !smtpSettings.host || !smtpSettings.user || !smtpSettings.pass) {
            console.warn("SMTP settings incomplete. Skipping email alert.");
            return;
        }

        let pass = smtpSettings.pass;
        try {
            pass = decrypt(pass);
        } catch (e) {
            // ignore
        }

        const transporter = nodemailer.createTransport({
            host: smtpSettings.host || undefined,
            port: smtpSettings.port || undefined,
            secure: smtpSettings.secure || false,
            auth: {
                user: smtpSettings.user || undefined,
                pass: pass,
            },
        });

        const subject = `Security Alert: ${type == 'PASSWORD' ? 'Password' : 'PIN'} Changed`;
        const html = `
            <div style="font-family: sans-serif; padding: 20px;">
                <h2 style="color: #000;">Portfolio Security Alert</h2>
                <p>Hello Admin,</p>
                <p>This is an automated message to notify you that your <strong>${type === 'PASSWORD' ? 'Password' : 'PIN'}</strong> was successfully changed.</p>
                <p>Date: ${new Date().toLocaleString('it-IT')}</p>
                <p>If you did not make this change, please reset your credentials immediately.</p>
                <hr />
                <p style="font-size: 12px; color: #666;">Portfolio Admin Panel</p>
                <p style="font-size: 10px; color: #999;">IP: ${"N/A (See Logs)"}</p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Portfolio Admin" <${smtpSettings.user}>`,
            to: emailTo,
            subject,
            html,
        });

        console.log(`Security alert email sent to ${emailTo}`);
    } catch (error) {
        console.error("Failed to send security alert email:", error);
    }
}

export async function updateSmtpSettings(newSettings: Omit<SmtpSettings, 'isEncrypted'>) {
    console.log("Updating SMTP Settings...", { ...newSettings, pass: '***' });

    // Encrypt password before saving
    const encryptedPass = encrypt(newSettings.pass);
    const safeSettings = {
        host: newSettings.host,
        port: newSettings.port,
        user: newSettings.user,
        pass: encryptedPass,
        secure: newSettings.port === 465,
        updatedAt: new Date(),
    };

    const existing = await db.select().from(settings).limit(1);

    if (existing.length > 0) {
        console.log("Updating existing SMTP row:", existing[0].id);
        await db.update(settings).set(safeSettings).where(eq(settings.id, existing[0].id));
    } else {
        console.log("Inserting new SMTP row");
        await db.insert(settings).values(safeSettings);
    }
    console.log("SMTP Settings updated successfully.");
}

export async function getSmtpSettings(): Promise<SmtpSettings> {
    try {
        const result = await db.select().from(settings).limit(1);
        const s = result[0];

        if (!s) {
            return {
                host: "",
                port: 587,
                user: "",
                pass: "",
                secure: false
            };
        }

        let pass = s.pass || "";
        if (pass) {
            try {
                pass = decrypt(pass);
            } catch {
                pass = ""; // Fail safe
            }
        }

        return {
            host: s.host || "",
            port: s.port || 587,
            user: s.user || "",
            pass,
            secure: s.secure || false
        };
    } catch (e) {
        console.error("Error fetching SMTP settings:", e);
        return {
            host: "",
            port: 587,
            user: "",
            pass: "",
            secure: false
        };
    }
}
