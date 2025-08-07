const mongodb = require('mongodb');
// let mongodbConnection;

const dbConnection = async function makeDb() {
  const MongoClient = mongodb.MongoClient;
  const url = process.env.DATABASE_URI;
  const dbName = process.env.DATABASE_NAME;
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const mongodatabase = await client.db(dbName);
   console.log("Connected to the DB (mongo)");
  //  mongodbConnection = mongodatabase;
  return mongodatabase;
}

module.exports = {
  dbConnection,
  // database,
  // mongodbConnection,
}