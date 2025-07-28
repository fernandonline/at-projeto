import { getMessagesCollection } from "../../api/db/client";
import { adminAuth } from "../firebase/firebaseAdmin";

export default defineEventHandler(async (event) => {
  const authHeader = getRequestHeader(event, 'authorization')
  const token = authHeader?.split('Bearer ')[1]

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Token não enviado' })
  }

  let decoded
  try {
    decoded = await adminAuth.verifyIdToken(token)
  } catch (e) {
    throw createError({ statusCode: 403, statusMessage: 'Token inválido' })
  }

  const uid = decoded.uid
  const body = await readBody(event)

  const novaMensagem = {
    userId: uid,
    title: body.title,
    date: body.date,
    message: body.message,
    publicLink: body.publicLink,
    publicLinkQR: body.publicLinkQR
  }

  const collection = await getMessagesCollection()
  await collection.insertOne(novaMensagem)

  return { success: true }
})