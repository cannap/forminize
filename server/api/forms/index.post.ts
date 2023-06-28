export default defineEventHandler(async (event) => {
  const session = await requireAuth(event);

  try {
    await db.insert(tables.forms).values({
      userId: session.user.id,
      title: 'Wtf',
      id: generateId()
    });
  } catch (error) {
    console.log(error);
  }
});
