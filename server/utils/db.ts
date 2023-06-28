import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import { sql, SQL } from 'drizzle-orm';
import { AnyMySqlTable } from 'drizzle-orm/mysql-core';
import * as _tables from '../db/schema';
export const tables = _tables;

const connection = connect({
  host: process.env['DATABASE_HOST'],
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD']
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
  where?: SQL | undefined;
  currentPage?: number;
}) => {
  const _count = () => {
    return sql<number>`count(*)`;
  };

  const { perPage = 10, table, where, currentPage = 1 } = options;

  const result = await db
    .select({ count: _count() })
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
