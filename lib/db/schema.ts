import { boolean, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const alerts = pgTable('alerts', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  city: text('city').notNull(),
  threshold: numeric('threshold').notNull(),
  type: text('type').notNull(),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
