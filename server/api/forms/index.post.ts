import { eq, sql } from 'drizzle-orm';
import { useValidatedBody, z } from 'h3-zod';
export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);

  const { title } = await useValidatedBody(event, {
    title: z.string().min(1).max(100)
  });

  const formData = {
    userId: session.user.id,
    title: title,
    id: generateId()
  };

  try {
    await db.insert(tables.forms).values({
      ...formData
    });

    const newForm = db.query.forms.findFirst({
      where: eq(tables.forms.id, formData.id)
    });

    return newForm;
  } catch (error) {
    console.log(error);
  }
});
