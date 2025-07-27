import { defineEventHandler, getQuery } from 'h3';
import { getMessagesCollection } from '../../db/client';
import { convertId } from '../../utils/convertId';

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);

  if (!userId) return { status: 400, message: "userId é obrigatório" };

  const collection = await getMessagesCollection();
  const results = await collection.find({ userId }).toArray();

  return results.map(convertId);
});
