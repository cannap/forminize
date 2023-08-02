import { eq, and } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);

  const { id } = getRouterParams(event);

  try {
    const deletedPoll = await db
      .delete(tables.polls)
      .where(
        and(
          eq(tables.polls.id, Number(id)),
          eq(tables.polls.ownerId, session.user.id)
        )
      );
    console.log(deletedPoll);
    return deletedPoll;
  } catch (error) {}
});
