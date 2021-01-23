import { Db, MongoClient } from 'mongodb'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const name = 'groot'
const password = 'rocket'
const dbName = 'snake'

const url = `mongodb://${name}:${password}@localhost:27017`
const dbms = new MongoClient(url, options)

export const connect = async (): Promise<Db> => {
  try {
    console.log('Trying to connect to mongo, wait...')

    const client = await dbms.connect()

    console.log('Successfully connected!')

    return client.db(dbName)
  } catch (e) {
    console.log('Error with connection to mongo')

    process.exit(0)
  }
}
