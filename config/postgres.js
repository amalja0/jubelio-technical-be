require('babel-core/register');

const config = require('.');

module.exports = {
  development: {
    username: config.dbUsername,
    password: config.dbPassword,
    database: config.dbName,
    host: config.dbHost,
    dialect: config.dialect,
    port: config.dbPort,
  }
}