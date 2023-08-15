import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();

export default {
  out: './server/db/migrations',
  schema: './server/db/schema.ts',
  // breakpoints: true,
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  }
} satisfies Config;
