import db from './models'

const db = await db.sequelize;

// Test the connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Connection error:', err));

// Sync models (only in development)
if (process.env.NODE_ENV === 'development') {
  db.sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Sync error:', err));
}