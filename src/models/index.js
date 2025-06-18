import {Sequelize} from "sequelize";
import {DATABASE, dialect, HOST, PASSWORD, pool, PORT, USER} from "../../config/db.config";

const sequelize = new Sequelize(
  DATABASE,
  USER,
  PASSWORD,
  {
    dialect: dialect,
    host: HOST,
    port: PORT,
    pool: {
      max: pool.max,
      min: pool.min,
      acquire:pool.acquire,
      idle: pool.idle,
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


module.exports = db;
