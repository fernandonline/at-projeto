import { defineEventHandler, readBody } from 'h3';
import { getMessagesCollection } from '../../db/client';
import { generateSlug } from '../../utils/generateSlug';
import { Message } from '../../db/schemas';

export default defineEventHandler(async (event) => {
  const body = await readBody<Message>(event);
  const { userId, title, message, date, imageUrl } = body;

  if (!userId || !title || !message) {
    return { status: 400, message: "Campos obrigatórios ausentes" };
  }

  const link = generateSlug();

  const collection = await getMessagesCollection();
  const result = await collection.insertOne({
    userId,
    title,
    message,
    date: date,
    imageUrl: imageUrl || null,
    link,
    createdAt: new Date().toISOString(),
  });

  return {
    status: 201,
    link,
    id: result.insertedId.toString()
  };
});
