import { connectDb, getUsersModel } from "../db/client";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ uid: string; email: string; name: string }>(event);

  if (!body?.uid) {
    return createError({ statusCode: 400, statusMessage: "Faltam dados de usuário" });
  }

  await connectDb();
  const User = getUsersModel();

  const exists = await User.findOne({ uid: body.uid });

  if (!exists) {
    await User.create({
      uid: body.uid,
      email: body.email,
      name: body.name,
      createdAt: new Date()
    });
  }

  return { success: true };
});
