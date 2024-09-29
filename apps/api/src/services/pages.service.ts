import { ResultSetHeader } from 'mysql2/promise';

import { PagesModel, PagesFormData, PagesModelData } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, InsertedIdResponse } from '../types';

const TABLE = 'cms_pages';

const getPages = async (): Promise<PagesModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await connection.query<PagesModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getPageById = async (id: number): Promise<PagesModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await connection.query<PagesModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createPage = async (data: PagesFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const { name, type, categories } = data;
    const query = `INSERT INTO ${TABLE} (name, type, categories, active, deleted) VALUES (?, ?, ?, 1, 0)`;
    const [result] = await connection.execute<ResultSetHeader>(query, [name, type, categories]);

    return { insertId: result.insertId };
  } finally {
    connection.release();
  }
};

const updatePage = async (id: number, data: Partial<PagesModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const { name, type, categories, active, deleted } = data;
    const query = `UPDATE ${TABLE} SET name = ?, type = ?, categories = ?, active = ?, deleted = ? WHERE id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(query, [name, type, categories, active, deleted, id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deletePage = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedPages = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const togglePage = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedPages = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getPages,
  getById: getPageById,
  create: createPage,
  update: updatePage,
  delete: deletePage,
  deleteSelected: deleteSelectedPages,
  toggle: togglePage,
  toggleSelected: toggleSelectedPages,
};
