import { defineEventHandler, createError } from 'h3'
import { connectDb, getMessagesModel } from '../db/client'
import { convertId } from '../utils/converId'

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params || {}

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug inválido' })
  }

  await connectDb()
  const Message = getMessagesModel()

  const doc = await Message.findOne({ slug })

  if (!doc) {
    throw createError({ statusCode: 404, statusMessage: 'Mensagem não encontrada' })
  }

  return convertId(doc.toObject())
})
