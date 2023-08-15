import { eq, and } from 'drizzle-orm';
import { createPollSchema } from '@/shared/validations/poll';
import format from 'date-fns/format';
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);

  const body = await useValidateBody(event, createPollSchema);

  const { insertId: pollId } = await db.insert(tables.polls).values({
    question: body.question,
    startsAt: body.startsAt,
    endsAt: body.endsAt,
    ownerId: session.user.id
  });
  /**
   *     question: body.question,
    startsAt: body.startsAt,
    endsAt: body.endsAt,
    owner: session.user.id
   */

  const pollOptions = body.pollOptions.map(({ answer, order, id }) => {
    const pollOption = {
      answer,
      order,
      id,
      pollId: Number(pollId) //We need to use tulpe in the schema
    };

    return pollOption;
  });

  await db.insert(tables.pollOptions).values(pollOptions);

  const newPoll = await db.query.polls.findFirst({
    where: and(
      eq(tables.polls.id, Number(pollId)),
      eq(tables.polls.ownerId, session.user.id)
    ),
    with: { pollOptions: true }
  });
  return newPoll;
});
