import { relations } from 'drizzle-orm';
import {
  int,
  mysqlTable,
  primaryKey,
  timestamp,
  serial,
  text,
  datetime,
  varchar,
  boolean
} from 'drizzle-orm/mysql-core';

import { AdapterAccount } from 'next-auth/adapters';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified'),
  image: varchar('image', { length: 255 })
});

export const accounts = mysqlTable(
  'accounts',
  {
    userId: varchar('userId', { length: 255 }).notNull(),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
    refresh_token: varchar('refresh_token', { length: 255 }),
    access_token: varchar('access_token', { length: 255 }),
    expires_at: int('expires_at'),
    refresh_token_expires_in: int('refresh_token_expires_in'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: varchar('id_token', { length: 255 }),
    session_state: varchar('session_state', { length: 255 })
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
);

export const sessions = mysqlTable('sessions', {
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = mysqlTable(
  'verificationToken',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token)
  })
);

export const polls = mysqlTable('polls', {
  id: serial('id').primaryKey(),
  question: text('question').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  isClosed: boolean('is_closed').default(false),
  startsAt: datetime('starts_at').notNull(),
  endsAt: datetime('ends_at').notNull(),
  ownerId: varchar('owner_id', { length: 255 }).notNull(),
  //Result will only visible to the creator
  // publicResult: boolean('public_result').default(false),
  //Everyone can see the result witouth voting
  captcha: boolean('captcha').default(false),
  showWithOuthVote: boolean('show_with_out_vote').default(false),
  information: text('information').default('')
});

export const usersRelations = relations(users, ({ many }) => ({
  polls: many(polls)
}));

export const pollsRelations = relations(polls, ({ one, many }) => ({
  owner: one(users, {
    fields: [polls.ownerId],
    references: [users.id]
  }),
  pollOptions: many(pollOptions)
}));

export const pollOptions = mysqlTable('poll_options', {
  id: serial('id').primaryKey(),
  pollId: varchar('poll_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  answer: text('answer').notNull()
  //TODO:  order: number('order') unique / notNull
});

export const pollsOptionsRelations = relations(pollOptions, ({ one }) => ({
  poll: one(polls, {
    fields: [pollOptions.pollId],
    references: [polls.id]
  })
}));
// A poll has many poll options
