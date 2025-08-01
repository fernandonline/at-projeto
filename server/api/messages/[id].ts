import { defineEventHandler, createError, H3Event } from 'h3'
import { connectDb, getMessagesModel } from '../db/client'

export default defineEventHandler(async (event: H3Event) => {
  const params = event.context.params
  if (!params || !params.id) {
    throw createError({ statusCode: 400, statusMessage: 'Parâmetro "id" é obrigatório' })
  }

  const messageId = params.id
  await connectDb()
  const Message = getMessagesModel()

  let doc
  try {
    doc = await Message.findById(messageId)
  } catch (e) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Mensagem não encontrada' })
  }

  const { _id, ...rest } = doc.toObject()
  return {
    id: _id.toString(),
    ...rest
  }
})
