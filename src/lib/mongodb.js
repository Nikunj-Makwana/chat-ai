import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'chatai';

if (!uri) {
    throw new Error('MONGODB_URI is not set and no fallback found');
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export async function getDb() {
    const client = await clientPromise;
    return client.db(dbName);
}
