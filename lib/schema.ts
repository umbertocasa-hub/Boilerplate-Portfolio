
import { pgTable, text, serial, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    pinHash: text('pin_hash').notNull(),
    isTwoFactorEnabled: boolean('is_two_factor_enabled').default(false),
    twoFactorSecret: text('two_factor_secret'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const settings = pgTable('settings', {
    id: serial('id').primaryKey(),
    host: text('host').default('smtp.gmail.com'),
    port: integer('port').default(587),
    user: text('user').default(''),
    pass: text('pass').default(''), // Encrypted
    secure: boolean('secure').default(false),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
    id: text('id').primaryKey(), // Using text for UUID to match existing architecture
    title: text('title').notNull(),
    description: text('description').notNull(),
    link: text('link').default('#'),
    tags: text('tags').array(), // Postgres array
    category: text('category').default('project'),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').defaultNow(),
});

// ... existing code ...
export const authenticators = pgTable('authenticators', {
    credentialID: text('credential_id').primaryKey(),
    credentialPublicKey: text('credential_public_key').notNull(),
    counter: integer('counter').notNull().default(0),
    transports: text('transports'), // JSON string or array, simplify as text
    userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow(),
});

export const photos = pgTable('photos', {
    id: text('id').primaryKey(),
    url: text('url').notNull(),
    caption: text('caption'),
    tags: text('tags').array(), // Postgres array
    category: text('category'),
    mimeType: text('mime_type'),
    type: text('type'),
    width: integer('width'),
    height: integer('height'),
    createdAt: timestamp('created_at').defaultNow(),
});
