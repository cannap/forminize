import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);

  const polls = await db.query.polls.findMany({
    with: {
      pollOptions: {
        orderBy: (options, { asc }) => [asc(options.order)]
      }
    },

    orderBy: (polls, { desc }) => [desc(polls.createdAt)],
    where: eq(tables.polls.ownerId, session.user.id)
  });

  const total = await db
    .select({
      count: sql<number>`count(${tables.polls.id})`
    })
    .from(tables.polls)
    .where(eq(tables.polls.ownerId, session.user.id));

  return { polls, total: Number(total[0]?.count) ?? 0 };
});
