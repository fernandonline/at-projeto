import { defineEventHandler, createError, H3Event } from 'h3'
import { getMessagesCollection } from '../db/client'
import { ObjectId } from 'mongodb'

export default defineEventHandler(async (event: H3Event) => {
  const params = event.context.params
  if (!params || !params.id) {
    throw createError({ statusCode: 400, statusMessage: 'Parâmetro "id" é obrigatório' })
  }

  const messageId = params.id
  const messages = await getMessagesCollection()
  let doc
  try {
    doc = await messages.findOne({ _id: new ObjectId(messageId) })
  } catch (e) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Mensagem não encontrada' })
  }

  const { _id, ...rest } = doc
  return {
    id: _id.toString(),
    ...rest
  }
})


