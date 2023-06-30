import { and, eq, sql } from 'drizzle-orm';
import { useValidatedParams, z } from 'h3-zod';

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);

  const { formId } = await useValidatedParams(event, {
    formId: z.string().min(1)
  });

  try {
    const records = await db.query.forms.findFirst({
      where: and(eq(tables.forms.id, formId), eq(tables.forms.userId, user.id)),
      with: { inputs: true },
      extras: {
        inputCount:
          sql<number>`(SELECT COUNT(*) FROM ${tables.inputs} WHERE inputs.form_id = ${tables.forms.id})`.as(
            'input_count'
          )
      }
    });

    return records;
  } catch (error) {
    console.log('HURE');
  }
});
