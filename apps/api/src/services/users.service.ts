import mysql, { RowDataPacket, ResultSetHeader, OkPacket } from 'mysql2/promise';

import { UsersModel } from '@model';

const conn = mysql.createPool({
  host: 'localhost',
  user: process.env.CMS_DB_USER,
  password: process.env.CMS_DB_PASSWORD,
  database: process.env.CMS_DB_NAME,
});

// Typ pro uživatele
interface User {
  id: number;
  name: string;
  email: string;
}

// Mock databáze
const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

export const getUsers = async (): Promise<
  | OkPacket
  | ResultSetHeader
  | ResultSetHeader[]
  | RowDataPacket[]
  | RowDataPacket[][]
  | OkPacket[]
  | [RowDataPacket[], ResultSetHeader]
> => {
  const [rows] = await conn.query('SELECT * FROM cms_users WHERE deleted = 0');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return rows ?? [];
};

const getUserById = async (id: number): Promise<User | null> => {
  return users.find((user) => user.id === id) || null;
};

const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
  const newUser = { ...data, id: users.length + 1 };

  users.push(newUser);

  return newUser;
};

const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...data };

    return users[userIndex];
  }

  return null;
};

const deleteUser = async (id: number): Promise<boolean> => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);

    return true;
  }

  return false;
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
