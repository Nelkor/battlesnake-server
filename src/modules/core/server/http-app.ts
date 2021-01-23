import { IncomingMessage, ServerResponse } from 'http'

import { Db } from 'mongodb'

export const createRequestHandler = (db: Db) => async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const collection = db.collection('items')

  const item = { value: Math.random() }

  await collection.insertOne(item)

  res.write(`Inserted ${item.value}`)
  res.end()
}
