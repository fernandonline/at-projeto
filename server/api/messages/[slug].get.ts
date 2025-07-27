import { defineEventHandler, getRouterParam } from 'h3';
import { getMessagesCollection } from '../../db/client';
import { convertId } from '../../utils/convertId';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  if (!slug) return { status: 400, message: "Slug inválido" };

  const collection = await getMessagesCollection();
  const doc = await collection.findOne({ slug });

  if (!doc) return { status: 404, message: "Não encontrado" };

  return convertId(doc);
});
