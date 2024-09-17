import mysql, { ResultSetHeader } from 'mysql2/promise';

import { UsersModel, UsersModelData } from '@model';
import { getTimestamp } from '@common';

// TODO - make this common
const conn = mysql.createPool({
  host: 'localhost',
  user: process.env.CMS_DB_USER,
  password: process.env.CMS_DB_PASSWORD,
  database: process.env.CMS_DB_NAME,
});

export const getUsers = async (): Promise<UsersModelData[]> => {
  const [rows] = await conn.query<UsersModelData[]>(`SELECT * FROM cms_users WHERE deleted = 0`);

  return rows ?? [];
};

const getUserById = async (id: number): Promise<UsersModelData[]> => {
  const [rows] = await conn.query<UsersModelData[]>(`SELECT * FROM cms_users WHERE id = ? AND deleted = 0`, [id]);

  return rows ?? [];
};

const createUser = async (
  data: Omit<UsersModel, 'id' | 'created' | 'updated' | 'deleted'>
): Promise<Pick<UsersModelData, 'id'>> => {
  const { firstname, lastname, email, password, type, role, salt } = data;
  const now = getTimestamp();

  const [result] = await conn.execute<ResultSetHeader>(
    `INSERT INTO cms_users (firstname, lastname, email, password, type, role, salt, created, updated, active, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)`,
    [firstname, lastname, email, password, type, role, salt, now, now]
  );

  return { id: result.insertId };
};

const updateUser = async (id: number, data: Partial<UsersModel>): Promise<{ affectedRows: number }> => {
  const { firstname, lastname, email, password, type, role, salt, active } = data;
  const now = getTimestamp();

  const [result] = await conn.execute<ResultSetHeader>(
    `UPDATE cms_users SET firstname = ?, lastname = ?, email = ?, password = ?, type = ?, role = ?, salt = ?, active = ?, updated = ? WHERE id = ? AND deleted = 0`,
    [firstname, lastname, email, password, type, role, salt, active, now, id]
  );

  return { affectedRows: result.affectedRows };
};

const deleteUser = async (id: number): Promise<{ affectedRows: number }> => {
  const [result] = await conn.execute<ResultSetHeader>(`UPDATE cms_users SET deleted = 1 WHERE id = ?`, [id]);

  return { affectedRows: result.affectedRows };
};

export default {
  get: getUsers,
  getById: getUserById,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
};
