import { boolean, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const alerts = pgTable('alerts', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), city: text('city').notNull(), threshold: numeric('threshold').notNull(), type: text('type').notNull(), active: boolean('active').notNull().default(true), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(), updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
export const pushSubscriptions = pgTable('push_subscriptions', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), endpoint: text('endpoint').notNull().unique(), p256dh: text('p256dh').notNull(), auth: text('auth').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
export const communityReports = pgTable('community_reports', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), type: text('type').notNull(), description: text('description').notNull(), latitude: numeric('latitude').notNull(), longitude: numeric('longitude').notNull(), photoPathname: text('photo_pathname'), status: text('status').notNull().default('pending'), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const favorites = pgTable('favorites', {
  id: text('id').primaryKey(), userId: text('userId').notNull(), city: text('city').notNull(), latitude: numeric('latitude').notNull(), longitude: numeric('longitude').notNull(), createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  status: text('status').notNull(),
  plan: text('plan').notNull(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})
