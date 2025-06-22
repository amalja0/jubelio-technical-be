import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  host: process.env.HOST || '127.0.0.1',
  port: parseInt(process.env.PORT) || 3000,
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: parseInt(process.env.DB_PORT || '5432', 10),
  dbUsername: process.env.DB_USERNAME || 'postgres',
  dbPassword: process.env.DB_PASSWORD || '',
  dbName: process.env.DB_NAME || 'sales_analytics',
  dialect: 'postgres',
}
export default config;