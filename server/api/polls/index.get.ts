import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  /*
  const polls = db.query.polls.findMany({
    where: eq(tables.polls.ownerId, session.user.id),
    with: { polloptions: true }
  });*/

  const { polls, total } = await db.transaction(async (tx) => {
    /* const polls = await tx
      .select()
      .from(tables.polls)

      .leftJoin(
        tables.pollOptions,
        eq(tables.polls.id, tables.pollOptions.pollId)
      )
      .where(eq(tables.polls.ownerId, session.user.id));*/

    const polls = await tx.query.polls.findMany({
      with: { pollOptions: true },
      where: eq(tables.polls.ownerId, session.user.id)
    });

    const total = await tx
      .select({
        count: sql<number>`count(${tables.polls.id})`
      })
      .from(tables.polls)
      .where(eq(tables.polls.ownerId, session.user.id));

    return { polls: polls, total: Number(total[0]?.count) ?? 0 };
  });

  return { polls, total };
});
