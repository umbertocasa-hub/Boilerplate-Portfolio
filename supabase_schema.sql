
-- Enable necessary extensions if needed (pgcrypto is often useful, but standard serial/text works)

-- USERS Table
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password_hash" TEXT NOT NULL,
    "pin_hash" TEXT NOT NULL,
    "is_two_factor_enabled" BOOLEAN DEFAULT false,
    "two_factor_secret" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- SETTINGS Table
CREATE TABLE IF NOT EXISTS "settings" (
    "id" SERIAL PRIMARY KEY,
    "host" TEXT DEFAULT 'smtp.gmail.com',
    "port" INTEGER DEFAULT 587,
    "user" TEXT DEFAULT '',
    "pass" TEXT DEFAULT '',
    "secure" BOOLEAN DEFAULT false,
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- PROJECTS Table
CREATE TABLE IF NOT EXISTS "projects" (
    "id" TEXT PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT DEFAULT '#',
    "tags" TEXT[], -- Postgres array
    "image_url" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW()
);

-- AUTHENTICATORS Table (WebAuthn)
CREATE TABLE IF NOT EXISTS "authenticators" (
    "credential_id" TEXT PRIMARY KEY,
    "credential_public_key" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "transports" TEXT,
    "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP DEFAULT NOW()
);

-- PHOTOS Table
CREATE TABLE IF NOT EXISTS "photos" (
    "id" TEXT PRIMARY KEY,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "tags" TEXT[],
    "category" TEXT,
    "mime_type" TEXT,
    "type" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "created_at" TIMESTAMP DEFAULT NOW()
);

-- Initial Settings Row (Optional but helpful)
INSERT INTO "settings" ("id", "host") VALUES (1, 'smtp.gmail.com') ON CONFLICT DO NOTHING;
