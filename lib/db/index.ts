import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL

if (!databaseUrl) {
  throw new Error('Missing database connection string for Better Auth')
}

export const pool = new Pool({ connectionString: databaseUrl })
export const db = drizzle(pool, { schema })
