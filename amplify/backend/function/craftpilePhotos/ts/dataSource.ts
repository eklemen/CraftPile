import { DataSource } from 'typeorm';

const dataSource: DataSource = new DataSource({
  type: 'cockroachdb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '26257'),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  ssl: {
    ca: process.env.SSL_CERT,
  },
});

export default dataSource;
