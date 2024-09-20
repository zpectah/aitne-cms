import { ResultSetHeader } from 'mysql2/promise';

import { TagsModel, TagsFormData, TagsModelData } from '@model';
import { pool } from '../utils';

export const getTags = async (): Promise<TagsModelData[]> => {
  const [rows] = await pool.query<TagsModelData[]>(`SELECT * FROM cms_tags WHERE deleted = 0`);

  return rows ?? [];
};

const getTagById = async (id: number): Promise<TagsModelData> => {
  const [rows] = await pool.query<TagsModelData[]>(`SELECT * FROM cms_tags WHERE id = ? AND deleted = 0`, [id]);

  return rows[0];
};

const createTag = async (data: TagsFormData): Promise<Pick<TagsModelData, 'id'>> => {
  const { name, color } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO cms_tags (name, color, active, deleted) VALUES (?, ?, 1, 0)`,
    [name, color]
  );

  return { id: result.insertId };
};

const updateTag = async (id: number, data: Partial<TagsModel>): Promise<{ affectedRows: number }> => {
  const { name, color, active, deleted } = data;

  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE cms_tags SET name = ?, color = ?, active = ?, deleted = ? WHERE id = ?`,
    [name, color, active, deleted, id]
  );

  return { affectedRows: result.affectedRows };
};

const deleteTag = async (id: number): Promise<{ affectedRows: number }> => {
  const [result] = await pool.execute<ResultSetHeader>(`UPDATE cms_tags SET deleted = 1 WHERE id = ?`, [id]);

  return { affectedRows: result.affectedRows };
};

export default {
  get: getTags,
  getById: getTagById,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
};
