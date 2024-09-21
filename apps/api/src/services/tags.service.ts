import { ResultSetHeader } from 'mysql2/promise';

import { TagsModel, TagsFormData, TagsModelData } from '@model';
import { pool } from '../utils';

const TABLE = 'cms_tags';

const getTags = async (): Promise<TagsModelData[]> => {
  const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
  const [rows] = await pool.query<TagsModelData[]>(query);

  return rows ?? [];
};

const getTagById = async (id: number): Promise<TagsModelData> => {
  const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
  const [rows] = await pool.query<TagsModelData[]>(query, [id]);

  return rows[0];
};

const createTag = async (data: TagsFormData): Promise<Pick<TagsModelData, 'id'>> => {
  const { name, color } = data;
  const query = `INSERT INTO ${TABLE} (name, color, active, deleted) VALUES (?, ?, 1, 0)`;
  const [result] = await pool.execute<ResultSetHeader>(query, [name, color]);

  return { id: result.insertId };
};

const updateTag = async (id: number, data: Partial<TagsModel>): Promise<{ affectedRows: number }> => {
  const { name, color, active, deleted } = data;
  const query = `UPDATE ${TABLE} SET name = ?, color = ?, active = ?, deleted = ? WHERE id = ?`;
  const [result] = await pool.execute<ResultSetHeader>(query, [name, color, active, deleted, id]);

  return { affectedRows: result.affectedRows };
};

const deleteTag = async (id: number): Promise<{ affectedRows: number }> => {
  const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id = ?`;
  const [result] = await pool.execute<ResultSetHeader>(query, [id]);

  return { affectedRows: result.affectedRows };
};

const deleteSelectedTags = async (ids: number[]): Promise<{ affectedRows: number }> => {
  const placeholders = ids.map(() => '?').join(',');
  const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id IN (${placeholders})`;
  const [result] = await pool.execute<ResultSetHeader>(query, ids);

  return { affectedRows: result.affectedRows };
};

export default {
  get: getTags,
  getById: getTagById,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
  deleteSelected: deleteSelectedTags,
};
