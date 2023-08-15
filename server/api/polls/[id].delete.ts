import { eq, and } from 'drizzle-orm';
import { object, coerce, number } from 'valibot';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  //TODO: check for id
  const { id } = await useValidateParams(
    event,
    object({ id: coerce(number(), Number) })
  );

  try {
    const deletedPoll = await db
      .delete(tables.polls)
      .where(
        and(eq(tables.polls.id, id), eq(tables.polls.ownerId, session.user.id))
      );

    if (deletedPoll.rowsAffected > 0) {
      console.log('we are sure we can safly delete pollOptions');
      const deletedOptions = await db
        .delete(tables.pollOptions)
        .where(eq(tables.pollOptions.pollId, id));
      console.log(deletedOptions);
    }
    sendNoContent(event);
  } catch (error) {}
});
