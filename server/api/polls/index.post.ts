import { eq, and } from 'drizzle-orm';
import { createPollSchema } from '@/shared/validations/poll';
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);

  const body = await useValidateBody(event, createPollSchema);
  const date = new Date();

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
  await db.insert(tables.pollOptions).values({
    answer: 'hello World',
    pollId
  });

  const newPoll = await db.query.polls.findFirst({
    where: and(
      eq(tables.polls.id, Number(pollId)),
      eq(tables.polls.ownerId, session.user.id)
    ),
    with: { pollOptions: true }
  });
  return newPoll;
});
