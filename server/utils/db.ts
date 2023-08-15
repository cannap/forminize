import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { sql, type SQL } from 'drizzle-orm';
import { AnyMySqlTable } from 'drizzle-orm/mysql-core';
import * as _tables from '../db/schema';
import { PollOptionsSchema } from '../../shared/validations/poll';
export const tables = _tables;
const { database } = useRuntimeConfig();
const connection = connect({
  host: database.host,
  username: database.username,
  password: database.password
});

export const db = drizzle(connection, {
  logger: true,
  schema: tables
});

export const createPagination = async (options: {
  table: AnyMySqlTable;
  offest?: number;
  limit?: number;
  perPage?: number;
  where?: SQL;
  currentPage?: number;
}) => {
  const { perPage = 10, table, where, currentPage = 1 } = options;

  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(table)
    .where(where)
    .limit(1);

  const total = result[0].count;
  return {
    total,
    to: currentPage * perPage,
    perPage,
    from: (currentPage - 1) * perPage + 1,
    lastPage: Math.ceil(total / perPage),
    currentPage: currentPage
  };
};

export const updatePollOptionsOrder = (pollOptions: PollOptionsSchema) => {};
