import { ResultSetHeader } from 'mysql2/promise';

import { UsersModel, UsersFormData, UsersModelData } from '@model';
import { pool } from '../utils';

const TABLE = 'cms_users';

export const getUsers = async (): Promise<UsersModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT id, firstname, lastname, email, type, role, created, updated, active, deleted FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await pool.query<UsersModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getUserById = async (id: number): Promise<UsersModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await pool.query<UsersModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createUser = async (data: UsersFormData): Promise<{ insertId: number }> => {
  const connection = await pool.getConnection();

  try {
    const { firstname, lastname, email, password, type, role, salt, active, deleted } = data;
    const query = `INSERT INTO ${TABLE} (firstname, lastname, email, password, type, role, salt, active, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await pool.execute<ResultSetHeader>(query, [
      firstname,
      lastname,
      email,
      password,
      type,
      role,
      salt,
      active,
      deleted,
    ]);

    return { insertId: result.insertId };
  } finally {
    connection.release();
  }
};

const updateUser = async (id: number, data: Partial<UsersModel>): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const { firstname, lastname, email, password, type, role, salt, active } = data;
    const query = `UPDATE ${TABLE} SET firstname = ?, lastname = ?, email = ?, type = ?, role = ?, active = ? WHERE id = ? AND deleted = 0`;
    const queryWithPassword = `UPDATE ${TABLE} SET firstname = ?, lastname = ?, email = ?, password = ?, type = ?, role = ?, salt = ?, active = ? WHERE id = ? AND deleted = 0`;
    const values = [firstname, lastname, email, type, role, active, id];
    const valuesWithPassword = [firstname, lastname, email, password, type, role, salt, active, id];

    if (password !== '' && salt !== '') {
      const [result] = await pool.execute<ResultSetHeader>(queryWithPassword, valuesWithPassword);

      return { affectedRows: result.affectedRows };
    }

    const [result] = await pool.execute<ResultSetHeader>(query, values);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteUser = async (id: number): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteSelectedUsers = async (ids: number[]): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const placeholders = ids.map(() => '?').join(',');
    const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id IN (${placeholders})`;
    const [result] = await pool.execute<ResultSetHeader>(query, ids);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

export default {
  get: getUsers,
  getById: getUserById,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
  deleteSelected: deleteSelectedUsers,
};
