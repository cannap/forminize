import { coerce, number, object } from 'valibot';
import { PollOptionsSchema, createPollSchema } from '@/shared/validations/poll';

import { and, eq, inArray } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  const { id: pollId } = await useValidateParams(
    event,
    object({ id: coerce(number(), Number) })
  );

  const { pollOptions, id, ...pollBody } = await useValidateBody(
    event,
    createPollSchema
  );

  await db
    .update(tables.polls)
    .set(pollBody)
    .where(
      and(
        eq(tables.polls.ownerId, session.user.id),
        eq(tables.polls.id, pollId)
      )
    );

  const poll = await db.query.polls.findFirst({
    with: {
      pollOptions: true
    },
    where: and(
      eq(tables.polls.ownerId, session.user.id),
      eq(tables.polls.id, pollId)
    )
  });

  if (!poll) {
    //When nothing comes back abort early
    throw createError({
      statusCode: 404,
      statusMessage: 'Poll not Found'
    });
  }

  //Find all delete polls
  const removeablePollOptions = findMissingItems(
    poll?.pollOptions,
    pollOptions,
    'id'
  ).map((o) => o.id);

  //Delete removeable Polls
  if (removeablePollOptions.length > 0) {
    console.log('Removable', removeablePollOptions);
    await db
      .delete(tables.pollOptions)
      .where(inArray(tables.pollOptions.id, removeablePollOptions));
  }

  const newPollOptions = pollOptions
    .filter((op) => op.isNew)
    .map(({ isNew, ...options }) => ({
      ...options,
      pollId: poll.id
    }));

  if (newPollOptions.length > 0) {
    console.log('newoikk', newPollOptions);
    await db.insert(tables.pollOptions).values(newPollOptions);
  }

  const updatePollOption = (option: PollOptionsSchema) => {
    const { isNew, id, ...options } = option;
    console.log('option', option);
    return db
      .update(tables.pollOptions)
      .set({ ...options })
      .where(eq(tables.pollOptions.id, option.id));
  };

  //Update polloptions

  await Promise.all(
    pollOptions.map((option) => updatePollOption(option))
  ).catch((e) => {
    console.log(e);
    //  throw createError({ status: e.status });
  });

  const newPoll = await db.query.polls.findFirst({
    with: {
      pollOptions: {
        orderBy: (options, { asc }) => [asc(options.order)]
      }
    },
    where: and(
      eq(tables.polls.ownerId, session.user.id),
      eq(tables.polls.id, pollId)
    )
  });

  if (!newPoll) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Poll not Found'
    });
  }
  return newPoll;
});
