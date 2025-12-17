const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const USERS_FILE = path.join(__dirname, '../data/users.json');

const email = "admin@example.com";
// Allow passing args or default to showing usage
const password = process.argv[2];
const pin = process.argv[3];

if (!password || !pin) {
    console.error("Usage: node scripts/reset-password.js <new_password> <new_pin>");
    console.error("Example: node scripts/reset-password.js MySecretPass 123456");
    process.exit(1);
}

// Sync hash for simplicity in script
const passwordHash = bcrypt.hashSync(password, 10);
const pinHash = bcrypt.hashSync(pin, 10);

const userData = {
    users: [
        {
            email,
            passwordHash,
            pinHash
        }
    ]
};

console.log(`Resetting admin user for ${email}...`);
fs.writeFileSync(USERS_FILE, JSON.stringify(userData, null, 2));
console.log("Admin credentials reset successfully.");
console.log("You can now login with your new password and PIN.");
