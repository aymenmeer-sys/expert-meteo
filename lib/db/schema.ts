import { boolean, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const alerts = pgTable('alerts', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), city: text('city').notNull(), threshold: numeric('threshold').notNull(), type: text('type').notNull(), active: boolean('active').notNull().default(true), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
export const pushSubscriptions = pgTable('push_subscriptions', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), endpoint: text('endpoint').notNull().unique(), p256dh: text('p256dh').notNull(), auth: text('auth').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
export const favorites = pgTable('favorites', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), city: text('city').notNull(), latitude: numeric('latitude').notNull(), longitude: numeric('longitude').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
