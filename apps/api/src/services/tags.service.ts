import mysql, { ResultSetHeader } from 'mysql2/promise';

import { TagsModel, TagsModelData } from '@model';
import { getTimestamp } from '@common';

// TODO - make this common
const conn = mysql.createPool({
  host: 'localhost',
  user: process.env.CMS_DB_USER,
  password: process.env.CMS_DB_PASSWORD,
  database: process.env.CMS_DB_NAME,
});

export const getTags = async (): Promise<TagsModelData[]> => {
  const [rows] = await conn.query<TagsModelData[]>(`SELECT * FROM cms_tags WHERE deleted = 0`);

  return rows ?? [];
};

const getTagById = async (id: number): Promise<TagsModelData> => {
  const [rows] = await conn.query<TagsModelData[]>(`SELECT * FROM cms_tags WHERE id = ? AND deleted = 0`, [id]);

  return rows[0];
};

const createTag = async (
  data: Omit<TagsModel, 'id' | 'created' | 'updated' | 'deleted'>
): Promise<Pick<TagsModelData, 'id'>> => {
  const { name, color } = data;
  const now = getTimestamp();

  const [result] = await conn.execute<ResultSetHeader>(
    `INSERT INTO cms_tags (name, color, created, updated, active, deleted) VALUES (?, ?, ?, ?, 1, 0)`,
    [name, color, now, now]
  );

  return { id: result.insertId };
};

const updateTag = async (id: number, data: Partial<TagsModel>): Promise<{ affectedRows: number }> => {
  const { name, color, active } = data;
  const now = getTimestamp();

  const [result] = await conn.execute<ResultSetHeader>(
    `UPDATE cms_tags SET name = ?, color = ?, active = ?, updated = ? WHERE id = ? AND deleted = 0`,
    [name, color, active, now, id]
  );

  return { affectedRows: result.affectedRows };
};

const deleteTag = async (id: number): Promise<{ affectedRows: number }> => {
  const [result] = await conn.execute<ResultSetHeader>(`UPDATE cms_tags SET deleted = 1 WHERE id = ?`, [id]);

  return { affectedRows: result.affectedRows };
};

export default {
  get: getTags,
  getById: getTagById,
  create: createTag,
  update: updateTag,
  delete: deleteTag,
};
