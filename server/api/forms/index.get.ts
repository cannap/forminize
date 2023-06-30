import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  const whereEq = eq(tables.forms.userId, session.user.id);
  try {
    const records = await db.query.forms.findMany({
      where: whereEq,
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
    console.log('error', error);
  }
});
