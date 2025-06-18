import {configDotenv} from "dotenv";

configDotenv();

module.exports = {
  port: process.env.PORT || 5000,
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: process.env.DB_PORT || 5000,
  dbUsername: process.env.DB_USERNAME || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || '',
}