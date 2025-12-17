const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const USERS_FILE = path.join(__dirname, '../data/users.json');

const email = "admin@example.com";
const password = process.argv[2];
const pin = process.argv[3];

if (!password || !pin) {
    console.error("Usage: node scripts/setup-admin.js <password> <pin>");
    process.exit(1);
}

async function setup() {
    console.log(`Setting up admin user for ${email}...`);
    console.log("Hashing password...");
    // Use sync to avoid async event loop issues in simple scripts
    const passwordHash = bcrypt.hashSync(password, 10);
    console.log("Hashing PIN...");
    const pinHash = bcrypt.hashSync(pin, 10);
    console.log("Hashes generated, writing to file...");

    const userData = {
        users: [
            {
                email,
                passwordHash,
                pinHash
            }
        ]
    };

    fs.writeFileSync(USERS_FILE, JSON.stringify(userData, null, 2));
    console.log("Admin user created successfully.");
    console.log("Credentials stored safely in data/users.json (hashed).");
}

setup();
