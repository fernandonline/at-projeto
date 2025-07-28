import { defineEventHandler, createError } from 'h3';
import { getMessagesCollection } from '../db/client';
import { convertId } from '../utils/converId';

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {};

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Slug inválido" });
  }

  const collection = await getMessagesCollection();
  const doc = await collection.findOne({ slug });

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: "Mensagem não encontrada" });
  }

  return convertId ? convertId(doc) : doc;
});