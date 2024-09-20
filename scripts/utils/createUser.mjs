import mysql from 'mysql2/promise';
import { config } from 'dotenv';
import utils from '../utils/index.mjs';

config();

const DB_PORT = process.env.CMS_DB_PORT;
const DB_USER = process.env.CMS_DB_USER;
const DB_PASSWORD = process.env.CMS_DB_PASSWORD;
const DB_NAME = process.env.CMS_DB_NAME;

const createUser = async ({ firstname, lastname, email, password }) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    });

    const [existingUser] = await connection.execute(
      'SELECT id FROM cms_users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      console.warn('⚠️  Sorry, but user already exists with this email:', email);
      connection.end();

      return;
    }

    const salt = utils.getSalt();
    const hashedPassword = utils.hashPassword(password, salt);

    const [rows] = await connection.execute(
      'INSERT INTO cms_users (firstname, lastname, email, password, type, role, salt, active, deleted) VALUES (?,?,?,?,?,?,?,?,?)',
      [firstname, lastname, email, hashedPassword, 'default', 'admin', salt, 1, 0]
    );

    connection.end();

    console.log(`✔️󠀠   User "#${rows.insertId}" was successfully created`);
  } catch (error) {
    console.error(error);
  }
};

export default createUser;
