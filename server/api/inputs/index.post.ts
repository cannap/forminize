import { eq } from 'drizzle-orm';
import { z, useValidatedBody } from 'h3-zod';

export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);

  const body = await useValidatedBody(event, {
    formId: z.string().min(1),
    label: z.string().min(3).max(100)
  });

  await db.insert(tables.inputs).values({
    userId: user.id,
    formId: body.formId,
    type: 'text',
    id: generateId(),
    label: body.label
  });

  const newForm = await db.query.forms.findFirst({
    where: eq(tables.forms.id, body.formId),
    with: { inputs: true }
  });
  console.log(newForm);
  return newForm;
});
