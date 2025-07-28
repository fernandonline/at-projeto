import { getMessagesCollection } from "../db/client";
import { ObjectId } from "mongodb";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id, uid } = body;

  if (!uid || !id) {
    return createError({ statusCode: 401, statusMessage: "Login necessário" });
  }

  const messages = await getMessagesCollection();
  const result = await messages.deleteOne({ _id: new ObjectId(id), userId: uid });

  if (result.deletedCount === 0) {
    return createError({ statusCode: 404, statusMessage: "Mensagem não encontrada ou sem permissão" });
  }

  return { success: true };
});