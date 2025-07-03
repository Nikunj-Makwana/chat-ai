import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'chatai';

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
