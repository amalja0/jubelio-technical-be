import { fileURLToPath, pathToFileURL } from 'url';
import path, { dirname } from 'path';
import sequelize from '../../config/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db = null

export async function initializeDB() {
  if (!db) {
    console.log('Initializing database connection...');
    db = await sequelize.initSequelize(Object.assign({
      modelDir: { dirname: __dirname, basename: path.basename(__filename) },
    }, sequelize.db));

    try {
      await db.sequelize.authenticate();
      console.log('Database connection established successfully')
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }
  return db;
}

export function getDB() {
  if (!db) throw new Error('DB not initialized!');
  return db;
}

export default {};
