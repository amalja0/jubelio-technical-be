const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const { db: dbConfig } = require('../../config/sequelize.js').default

const options = {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: {
    max: 5, // maximum number of connections in pool
    min: 0, // minimum number of connections in pool
    acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
  },
};

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.username, dbConfig.password, options);

const db = {};
const modelsDir = __dirname;
const excludeFiles = ['index.js', 'models.constants.js', 'models.meta.js'];

fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js') && !excludeFiles.includes(file) && file !== path.basename(__filename))
  .forEach(file => {
    const modelModule = require(path.join(modelsDir, file));
    const modelFactory = Object.values(modelModule).find(val => typeof val === 'function');
    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  });


Object.values(db).forEach(model => {
  if (model.associate) model.associate(db);
});

db.sequelize = sequelize;

module.exports = db;