import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

const client = new MongoClient(uri, options);

let cachedDb: any;

export async function connectDb() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db(process.env.MONGODB_NAME);
  }
  return cachedDb;
}

export async function getUsersCollection() {
  const db = await connectDb();
  return db.collection("users");
}

export async function getMessagesCollection() {
  const db = await connectDb();
  return db.collection("messages");
}
