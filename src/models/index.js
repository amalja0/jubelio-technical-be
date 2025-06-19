import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import sequelize from '../../config/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let db = null

export async function initializeDB() {
  if (!db) {
    db = await sequelize.initSequelize(Object.assign({
      modelDir: { dirname: __dirname, basename: path.basename(__filename) },
    }, sequelize.db));
  }
  return db;
}

export default {};
