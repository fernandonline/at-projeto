import mongoose from 'mongoose'
import { useRuntimeConfig } from '#imports' // isso importa corretamente no contexto Nuxt 3

let isConnected = false

export async function connectDb() {
  if (isConnected) return

  const config = useRuntimeConfig()
  const uri = config.mongoDb
  const dbName = config.mongoName || 'amote'

  if (!uri) {
    throw new Error('⚠️ MONGO_URI não está definida em runtimeConfig')
  }

  try {
    await mongoose.connect(uri, {
      dbName,
    })
    isConnected = true
    console.log('✅ Conectado ao MongoDB com Mongoose')
  } catch (err) {
    console.error('❌ Erro ao conectar com Mongoose:', err)
    throw err
  }
}


export function getUsersModel() {
  const schema = new mongoose.Schema({
    uid: String,
    email: String,
    name: String,
    createdAt: Date,
  });
  return mongoose.models.User || mongoose.model("User", schema);
}

export function getMessagesModel() {
  const schema = new mongoose.Schema({
    userId: String,
    title: String,
    date: String,
    message: String,
    publicLink: String,
    publicLinkQR: String,
    createdAt: { type: Date, default: Date.now }
  });
  return mongoose.models.Message || mongoose.model("Message", schema);
}
