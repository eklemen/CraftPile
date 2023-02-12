'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const aws = require('aws-sdk');
const getDb = async () => {
  var _a;
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: [
        'db_host',
        'db_name',
        'db_username',
        'db_password',
        'db_cert', // 6
      ].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
  console.log('Parameters-------->', Parameters);
  const options = {
    type: 'cockroachdb',
    host: Parameters[0].Value,
    port: 26257,
    database: Parameters[1].Value,
    username: Parameters[3].Value,
    password: Parameters[4].Value,
    synchronize: false,
    ssl: {
      ca: Parameters[6].Value,
    },
  };
  console.log('Datasource options', options);
  const dataSource = new typeorm_1.DataSource(options);
  if (dataSource.isInitialized) {
    console.log('Datasource is initialized');
    return dataSource;
  } else {
    console.log('Initializing datasource');
    return await dataSource.initialize();
  }
};
exports.default = getDb;
