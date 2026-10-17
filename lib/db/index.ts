import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL

export const pool = new Pool({ connectionString: databaseUrl ?? 'postgresql://build:build@127.0.0.1:5432/build' })
export const db = drizzle(pool, { schema })
