import { ResultSetHeader } from 'mysql2/promise';

import { TagsModel, TagsFormData, TagsModelData } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, InsertedIdResponse } from '../types';

const TABLE = 'cms_tags';

const getTags = async (): Promise<TagsModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await connection.query<TagsModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getTagById = async (id: number): Promise<TagsModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await connection.query<TagsModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createTag = async (data: TagsFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const { name, color } = data;
    const query = `INSERT INTO ${TABLE} (name, color, active, deleted) VALUES (?, ?, 1, 0)`;
    const [result] = await pool.execute<ResultSetHeader>(query, [name, color]);

    return { insertId: result.insertId };
  } finally {
    connection.release();
  }
};

const updateTag = async (id: number, data: Partial<TagsModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const { name, color, active, deleted } = data;
    const query = `UPDATE ${TABLE} SET name = ?, color = ?, active = ?, deleted = ? WHERE id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(query, [name, color, active, deleted, id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteTag = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedTags = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleTag = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedTags = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getTags,
  getById: getTagById,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
  deleteSelected: deleteSelectedTags,
  toggle: toggleTag,
  toggleSelected: toggleSelectedTags,
};
