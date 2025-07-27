import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedDb: any;
let cachedCollection: any;

export async function getMessagesCollection() {
  if (!cachedCollection) {
    if (!cachedDb) {
      await client.connect();
      cachedDb = client.db(process.env.MONGODB_NAME);
    }
    cachedCollection = cachedDb.collection("messages");
  }
  return cachedCollection;
}
