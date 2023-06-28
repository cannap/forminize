import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);
  const whereEq = eq(tables.forms.userId, session.user.id);
  const records = await db.query.forms.findMany({
    where: whereEq,
    with: {
      fields: {
        columns: {
          label: true,
          inputType: true,
          placeholder: true
        }
      }
    }
  });

  return {
    meta: {
      ...(await createPagination({ table: tables.forms, where: whereEq }))
    },
    records
  };
});
