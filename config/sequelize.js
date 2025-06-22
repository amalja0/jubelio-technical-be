import {Sequelize} from "sequelize";
import fs from 'fs';
import path from 'path';
import config from './index.js';
import { pathToFileURL } from 'url';

const db = {
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  dbName: config.dbName,
  dialect: config.dialect,
};

// initialize sequelize
const initSequelize = async ({
  dbName, username, password, host, dialect, modelDir, port = 5432
}) => {
  const db = {};
  const excludeFiles = ['models.constants.js', 'models.meta.js'];
  const options = {
    host,
    port,
    dialect,
    pool: {
      max: 20, // maximum number of connections in pool
      min: 5, // minimum number of connections in pool
      acquire: 60000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    },
    retry: {
      match: [/Deadlock/i, Sequelize.ConnectionError], // Retry on connection errors
      max: 3, // Maximum retry 3 times
      backoffBase: 3000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
    logging: false
  };

  const sequelize = new Sequelize(dbName, username, password, options);

  for (const file of fs.readdirSync(modelDir.dirname)) {
    if (
      file.indexOf('.') !== 0 &&
      file !== modelDir.basename &&
      file.slice(-3) === '.js' &&
      !excludeFiles.includes(file)
    ) {
      const modelPath = pathToFileURL(path.join(modelDir.dirname, file)).href;
      const modelDef = await import(modelPath);
      const model = modelDef.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  }

  // Dynamically add model into db object
  // fs.readdirSync(modelDir.dirname)
  //   .filter(file => (file.indexOf('.') !== 0)
  //     && (file !== modelDir.basename)
  //     && (file.slice(-3) === '.js'))
  //   .filter(file => !excludeFiles.includes(file))
  //   .forEach((file) => {
  //     const modelPath = path.join(modelDir.dirname, file);
  //     const modelDef = import(modelPath);
  //     const model = modelDef.default(sequelize, Sequelize.DataTypes);
  //     db[model.name] = model;
  //   });

  Object.keys(db).map((modelName) => {
    // load model associations
    if (db[modelName].associate) db[modelName].associate(db);
    return modelName;
  }).map((modelName) => {
    // load model scopes
    if (db[modelName].loadScopes) db[modelName].loadScopes();
    return modelName;
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  db.models = db;

  return db;
};

const sequelize = new Sequelize(
  config.dbName,
  config.dbUsername,
  config.dbPassword,
  {
    dialect: config.dialect,
    host: config.dbHost,
    port: config.dbPort,
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 10000,
    },
    retry: {
      match: [/Deadlock/i, Sequelize.ConnectionError], // Retry on connection errors
      max: 3, // Maximum retry 3 times
      backoffBase: 3000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
  }
);

export default {
  initSequelize,
  Sequelize,
  sequelize,
  db,
}
