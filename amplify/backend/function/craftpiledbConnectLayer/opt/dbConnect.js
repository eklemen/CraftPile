const { MongoClient } = require('mongodb');
const aws = require('aws-sdk');

let cachedDb = null;
const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const { Parameters } = await (new aws.SSM())
    .getParameters({
      Names: ['mongo_uri'].map(secretName => process.env[secretName]),
      WithDecryption: true
    })
    .promise();
  const client = new MongoClient(Parameters[0].Value);

  // Specify which database we want to use
  const db = await client.db('craftpile');
  const photoCollection = db.collection('photos');
  const userCollection = db.collection('users');
  const albumCollection = db.collection('albums');
  const dbObject = { db, client, photoCollection, userCollection, albumCollection }
  cachedDb = dbObject;
  return dbObject;
}
exports.connectToDatabase = connectToDatabase;
