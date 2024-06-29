import { MongoClient } from 'mongodb';


// Returns the db
export const client = async () => {
  const client = new MongoClient(process.env.NEXT_PUBLIC_DB_URL!);
  await client.connect()
  return client
}

