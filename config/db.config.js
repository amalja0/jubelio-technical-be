import {dbHost, dbName, dbPassword, dbPort, dbUsername} from "./env.config";

module.exports = {
  HOST: dbHost,
  PORT: dbPort,
  USER: dbUsername,
  PASSWORD: dbPassword,
  DATABASE: dbName,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

