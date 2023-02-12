import { DataSource, DataSourceOptions } from 'typeorm';
const aws = require('aws-sdk');

const getDb = async () => {
  const { Parameters } = await new aws.SSM()
    .getParameters({
      Names: [
        'db_host', // 0
        'db_name', // 1
        'db_port', // 2
        'db_username', // 3
        'db_password', // 4
        'db_uri_string', // 5
        'db_cert', // 6
      ].map((secretName) => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();

  console.log('Parameters-------->', Parameters);
  const options: DataSourceOptions = {
    type: 'cockroachdb',
    host: Parameters[0].Value,
    port: parseInt(Parameters[2].Value ?? '26257'),
    database: Parameters[1].Value,
    username: Parameters[3].Value,
    password: Parameters[4].Value,
    synchronize: false,
    ssl: {
      ca: Parameters[6].Value,
    },
  };

  console.log('Datasource options', options);

  const dataSource: DataSource = new DataSource(options);

  if (dataSource.isInitialized) {
    console.log('Datasource is initialized');
    return dataSource;
  } else {
    console.log('Initializing datasource');
    return await dataSource.initialize();
  }
};
export default getDb;
