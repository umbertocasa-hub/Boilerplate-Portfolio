const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Copy of crypto logic since we can't import TS in JS easily without compilation
const KEY_FILE = path.join(process.cwd(), 'data/master.key');
const ALGORITHM = 'aes-256-cbc';

function getMasterKey() {
    if (fs.existsSync(KEY_FILE)) {
        return fs.readFileSync(KEY_FILE);
    }
    const key = crypto.randomBytes(32);
    fs.writeFileSync(KEY_FILE, key);
    return key;
}

const key = getMasterKey();

function encrypt(text) {
    if (!text) return "";
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

const SETTINGS_FILE = path.join(process.cwd(), 'data/settings.json');

if (fs.existsSync(SETTINGS_FILE)) {
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    if (data.smtp && data.smtp.pass && !data.smtp.isEncrypted) {
        console.log("Encrypting potentially exposed SMTP password...");
        data.smtp.pass = encrypt(data.smtp.pass);
        data.smtp.isEncrypted = true;
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2));
        console.log("✅ settings.json secured.");
    } else {
        console.log("ℹ️ settings.json already encrypted or missing password.");
    }
} else {
    console.log("settings.json not found.");
}
