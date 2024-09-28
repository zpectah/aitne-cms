import { ResultSetHeader } from 'mysql2/promise';

import { UsersModel, UsersFormData, UsersModelData } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, InsertedIdResponse } from '../types';

const TABLE = 'cms_users';

const getUsers = async (): Promise<UsersModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT id, firstname, lastname, email, type, role, created, updated, active, deleted FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await connection.query<UsersModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getUserById = async (id: number): Promise<UsersModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await connection.query<UsersModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createUser = async (data: UsersFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const { firstname, lastname, email, password, type, role, salt, active, deleted } = data;
    const query = `INSERT INTO ${TABLE} (firstname, lastname, email, password, type, role, salt, active, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await connection.execute<ResultSetHeader>(query, [
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

const updateUser = async (id: number, data: Partial<UsersModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const { firstname, lastname, email, password, type, role, salt, active } = data;
    const query = `UPDATE ${TABLE} SET firstname = ?, lastname = ?, email = ?, type = ?, role = ?, active = ? WHERE id = ? AND deleted = 0`;
    const queryWithPassword = `UPDATE ${TABLE} SET firstname = ?, lastname = ?, email = ?, password = ?, type = ?, role = ?, salt = ?, active = ? WHERE id = ? AND deleted = 0`;
    const values = [firstname, lastname, email, type, role, active, id];
    const valuesWithPassword = [firstname, lastname, email, password, type, role, salt, active, id];

    if (password !== '' && salt !== '') {
      const [result] = await connection.execute<ResultSetHeader>(queryWithPassword, valuesWithPassword);

      return { affectedRows: result.affectedRows };
    }

    const [result] = await connection.execute<ResultSetHeader>(query, values);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteUser = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedUsers = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleUser = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedUsers = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getUsers,
  getById: getUserById,
  create: createUser,
  update: updateUser,
  delete: deleteUser,
  deleteSelected: deleteSelectedUsers,
  toggle: toggleUser,
  toggleSelected: toggleSelectedUsers,
};
