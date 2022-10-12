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
/**
 * @fileoverview
 *
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames = process.env.MODULES.split(',');
/**
 * The array of imported modules.
 */
const modules = moduleNames.map(name => require(`./${name}`));

/**
 * This async handler iterates over the given modules and awaits them.
 *
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 *
 */
const { v4: uuidv4 } = require('uuid');
const { connectToDatabase } = require('/opt/dbConnect');
exports.handler = async (event, context) => {
  /**
   * Instead of naively iterating over all handlers, run them concurrently with
   * `await Promise.all(...)`. This would otherwise just be determined by the
   * order of names in the `MODULES` var.
   */
  if (event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
    console.log('first time sign up');
    try {
      const { userCollection } = await connectToDatabase();
      const res = await userCollection.insertOne({
        userId: event.userName,
        email: event?.request?.userAttributes?.email,
        accountId: uuidv4(),
        children: [],
      });
      console.log('res-------->', res);
    }
    catch (err) {
      console.log('error-------->', err);
    }
  }
  console.log('event-------->', event);
  await Promise.all(modules.map(module => module.handler(event, context)));
  return event;
};
