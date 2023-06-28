import { InferModel } from 'drizzle-orm';
type NewField = InferModel<typeof tables.fields, 'insert'>;
export default defineEventHandler(async (event) => {
  const { user } = await requireAuth(event);

  const body: NewField = await readBody(event);

  const fieldData = {
    ...body,
    userId: user.id,
    id: generateId()
  };

  await db.insert(tables.fields).values(fieldData);
  return { ...fieldData };
});
