import {
  string,
  object,
  minLength,
  date,
  optional,
  boolean,
  array,
  type Input,
  withDefault,
  number,
  coerce,
  ValiError
} from 'valibot';

import { isBefore } from 'date-fns';

export const pollOptions = object({
  answer: string([minLength(3, 'Answer must be at least 3 characters long')]),
  id: string(),
  isNew: optional(boolean()),
  order: number(),
  pollId: optional(number())
});

export type PollOptionsSchema = Input<typeof pollOptions>;

export const createPollSchema = object(
  {
    question: string([minLength(3, 'Minimum 3 characters')]),
    information: optional(string()),
    id: optional(number()),
    startsAt: coerce(date(), (input) => {
      return new Date(input as any);
    }),
    multiple: withDefault(boolean(), false),
    endsAt: coerce(date(), (input) => new Date(input as any)),
    captcha: withDefault(boolean(), false),
    pollOptions: array(pollOptions, [minLength(2)]),
    isClosed: withDefault(boolean(), false)
  },
  [
    (input) => {
      if (!isBefore(input.startsAt, input.endsAt)) {
        throw new ValiError([
          {
            reason: 'date',
            validation: 'custom',
            origin: 'value',
            message: 'The start date must be before the end date.',
            input: input.startsAt,
            path: [
              {
                schema: 'object',
                input: input,
                key: 'startsAt',
                value: input.startsAt
              }
            ]
          }
        ]);
      }
      return input;
    }
  ]
);

export type PollSchemaInput = Input<typeof createPollSchema>;
