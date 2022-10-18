/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["mongo_uri"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_CRAFTPILEPHOTOSTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

const { connectToDatabase } = require('/opt/dbConnect');

exports.handler = async function (event, context) {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const s3 = new aws.S3();
    const { Metadata } = await s3
      .headObject({
        Bucket: event.Records[0].s3.bucket.name,
        Key: event.Records[0].s3.object.key,
      })
      .promise();
    if (Metadata?.isthumbnail === 'true') {
      return {
        statusCode: 200,
      };
    }
    const { photoCollection } = await connectToDatabase();
    const accountId = event.Records[0].s3.object.key.split('/')[1];
    const albums = Metadata?.albums && Array.isArray(Metadata?.albums)
      ? Metadata?.albums
      : [];
    await photoCollection.insertOne({
      bucketName: event.Records[0].s3.bucket.name,
      objectKey: event.Records[0].s3.object.key,
      dateOfPhoto: new Date(),
      description: '',
      childId: Metadata?.childid || null,
      accountId,
      albums,
      tags: [],
    });
    return {
      statusCode: 200,
    };
  } catch (err) {
    console.log('error::::::::', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err }),
    };
  }
};
