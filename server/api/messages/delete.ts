import { defineEventHandler, createError } from 'h3'
import { connectDb, getMessagesModel } from '../db/client'
import { isValidObjectId } from 'mongoose'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { id, uid } = body

  if (!uid || !id) {
    throw createError({ statusCode: 401, statusMessage: 'Login necessário' })
  }

  if (!isValidObjectId(id)) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  await connectDb()
  const Message = getMessagesModel()

  const result = await Message.deleteOne({ _id: id, userId: uid })

  if (result.deletedCount === 0) {
    throw createError({ statusCode: 404, statusMessage: 'Mensagem não encontrada ou sem permissão' })
  }

  return { success: true }
})
