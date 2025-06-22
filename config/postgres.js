import '@babel/register';

import config from './index.js';

export default {
  development: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    dialect: config.dialect,
    port: config.dbPort,
  }
}