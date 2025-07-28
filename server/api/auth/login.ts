import { getUsersCollection } from "../db/client";
import type { User } from "../db/schemas";


export default defineEventHandler(async (event) => {
  const body = await readBody<{ uid: string; email: string; name: string }>(event);

  if (!body?.uid) {
    return createError({ statusCode: 400, statusMessage: "Faltam dados de usuário" });
  }

  const users = await getUsersCollection();
  const exists = await users.findOne({ uid: body.uid });

  if (!exists) {
    const novo: User = {
      uid: body.uid,
      email: body.email,
      name: body.name,
      createdAt: new Date()
    };
    await users.insertOne(novo);
  }

  return { success: true };
});