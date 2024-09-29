import mysql from 'mysql2/promise';
import { config } from 'dotenv';

config();

const DB_PORT = process.env.CMS_DB_PORT;
const DB_USER = process.env.CMS_DB_USER;
const DB_PASSWORD = process.env.CMS_DB_PASSWORD;
const DB_NAME = process.env.CMS_DB_NAME;

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    });
    await connection.end();
  } catch (error) {
    console.error(error.message);
  }
};

export default testConnection;
