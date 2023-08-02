import {
  string,
  object,
  minLength,
  date,
  optional,
  boolean,
  array,
  type Input,
  useDefault,
  number,
  coerce,
  union,
  ValiError
} from 'valibot';

import { isBefore } from 'date-fns';

export const pollOptions = object({
  answer: string([minLength(3)]),
  id: optional(union([string(), number()]))
});

export type PollOptionsSchema = Input<typeof pollOptions>;

export const createPollSchema = object(
  {
    question: string([minLength(3, 'Minimum 3 characters')]),
    information: optional(string()),
    id: optional(number()),
    startsAt: coerce(date(), (input) => new Date(input as any)),
    endsAt: coerce(date(), (input) => new Date(input as any)),
    captcha: useDefault(boolean(), false),
    pollOptions: array(pollOptions),
    isClosed: useDefault(boolean(), false)
  },
  [
    (input) => {
      console.log(input.startsAt, input.endsAt);
      if (!isBefore(input.startsAt, input.endsAt)) {
        throw new ValiError([
          {
            reason: 'date',
            validation: 'custom',
            origin: 'value',
            message: 'Invalid date custom',
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

export type PollSchema = Input<typeof createPollSchema>;
