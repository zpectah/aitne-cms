import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.CMS_DB_USER,
  password: process.env.CMS_DB_PASSWORD,
  database: process.env.CMS_DB_NAME,
  connectionLimit: 10,
});

export { pool };
