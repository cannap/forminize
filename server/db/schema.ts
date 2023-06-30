import { relations, InferModel, InferModelFromColumns } from 'drizzle-orm';
import {
  int,
  boolean,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  timestamp,
  text,
  varchar,
  json
} from 'drizzle-orm/mysql-core';
import { AdapterAccount } from 'next-auth/adapters';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
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

export const forms = mysqlTable('forms', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  userId: varchar('user_id', { length: 255 }),
  title: varchar('title', { length: 255 }).notNull(),
  description: varchar('description', { length: 512 }),
  status: mysqlEnum('status', ['draft', 'published', 'archived'])
    .default('draft')
    .notNull()
});

export const formsRelations = relations(forms, ({ many, one }) => ({
  inputs: many(inputs),
  user: one(users, {
    fields: [forms.userId],
    references: [users.id]
  })
}));

export const inputs = mysqlTable('inputs', {
  id: varchar('id', { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').onUpdateNow(),
  required: boolean('required').default(false).notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  placeholder: varchar('placeholder', { length: 255 }),
  formId: text('form_id').notNull(),
  type: mysqlEnum('type', ['text', 'number']).notNull(),
  userId: varchar('user_id', { length: 255 })
});

export const inputsRelations = relations(inputs, ({ one, many }) => ({
  form: one(forms, {
    fields: [inputs.formId],
    references: [forms.id]
  }),
  user: one(users, {
    fields: [inputs.userId],
    references: [users.id]
  })
}));
