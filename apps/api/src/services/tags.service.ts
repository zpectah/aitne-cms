import { ResultSetHeader } from 'mysql2/promise';

import { TagsModel, TagsFormData, TagsModelData } from '@model';
import { pool } from '../utils';

const TABLE = 'cms_tags';

const getTags = async (): Promise<TagsModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await pool.query<TagsModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getTagById = async (id: number): Promise<TagsModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await pool.query<TagsModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createTag = async (data: TagsFormData): Promise<{ insertId: number }> => {
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

const updateTag = async (id: number, data: Partial<TagsModel>): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const { name, color, active, deleted } = data;
    const query = `UPDATE ${TABLE} SET name = ?, color = ?, active = ?, deleted = ? WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [name, color, active, deleted, id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteTag = async (id: number): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteSelectedTags = async (ids: number[]): Promise<{ affectedRows: number }> => {
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
  get: getTags,
  getById: getTagById,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
  deleteSelected: deleteSelectedTags,
};
