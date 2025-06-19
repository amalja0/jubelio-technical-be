import {Sequelize} from "sequelize";
import fs from 'fs';
import path from 'path';
import config from './index.js';

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
      max: 5, // maximum number of connections in pool
      min: 0, // minimum number of connections in pool
      acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    },
  };

  const sequelize = new Sequelize(dbName, username, password, options);

  for (const file of fs.readdirSync(modelDir.dirname)) {
    if (
      file.indexOf('.') !== 0 &&
      file !== modelDir.basename &&
      file.slice(-3) === '.js' &&
      !excludeFiles.includes(file)
    ) {
      const modelPath = path.join(modelDir.dirname, file);
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
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    }
  }
);

export default {
  initSequelize,
  Sequelize,
  sequelize,
  db,
}
