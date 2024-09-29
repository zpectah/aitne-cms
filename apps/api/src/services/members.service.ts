import { ResultSetHeader } from 'mysql2/promise';

import { MembersModel, MembersFormData, MembersModelData } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, InsertedIdResponse } from '../types';

const TABLE = 'cms_members';

const getMembers = async (): Promise<MembersModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await connection.query<MembersModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getMemberById = async (id: number): Promise<MembersModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await connection.query<MembersModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createMember = async (data: MembersFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const { type, email, password, salt, firstname, lastname } = data;
    const query = `INSERT INTO ${TABLE} (type, email, password, salt, firstname, lastname, active, deleted) VALUES (?, ?, ?, ?, ?, ?, 1, 0)`;

    const [result] = await connection.execute<ResultSetHeader>(query, [
      type,
      email,
      password,
      salt,
      firstname,
      lastname,
    ]);

    return { insertId: result.insertId };
  } finally {
    connection.release();
  }
};

const updateMember = async (id: number, data: Partial<MembersModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const { type, email, password, salt, firstname, lastname, active, deleted } = data;
    const query = `UPDATE ${TABLE} SET type = ?, email = ?, password = ?, salt = ?, firstname = ?, lastname = ?, active = ?, deleted = ? WHERE id = ?`;

    const [result] = await connection.execute<ResultSetHeader>(query, [
      type,
      email,
      password,
      salt,
      firstname,
      lastname,
      active,
      deleted,
      id,
    ]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteMember = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedMembers = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleMember = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedMembers = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getMembers,
  getById: getMemberById,
  create: createMember,
  update: updateMember,
  delete: deleteMember,
  deleteSelected: deleteSelectedMembers,
  toggle: toggleMember,
  toggleSelected: toggleSelectedMembers,
};
