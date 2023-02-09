import 'reflect-metadata';
const { MongoClient } = require('mongodb');
const aws = require('aws-sdk');

let cachedDb = null;
const connectToDatabase = async () => {
  // if (cachedDb) {
  //   return cachedDb;
  // }

  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: [
        'mongo_uri', // 0
      ].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
  try {
    // cachedDatasource = await dataSource.initialize();
  } catch (err) {
    console.log('Error connecting to client::::-------->', err);
  }

  const client = new MongoClient(Parameters[0].Value);

  // Specify which database we want to use
  const db = await client.db('craftpile');
  const photoCollection = db.collection('photos');
  const userCollection = db.collection('users');
  const albumCollection = db.collection('albums');
  const childrenCollection = db.collection('children');
  const dbObject = {
    db,
    client,
    photoCollection,
    userCollection,
    albumCollection,
    childrenCollection,
  };
  cachedDb = dbObject;
  return dbObject;
};

exports.connectToDatabase = connectToDatabase;
