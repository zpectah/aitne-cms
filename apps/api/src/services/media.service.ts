import { ResultSetHeader } from 'mysql2/promise';

import { MediaModel, MediaFormData, MediaModelData } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, InsertedIdResponse } from '../types';

const TABLE = 'cms_media';

const getMedia = async (): Promise<MediaModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await connection.query<MediaModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getMediaById = async (id: number): Promise<MediaModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await connection.query<MediaModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createMedia = async (data: MediaFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const { name, type, mime, extension } = data;
    const query = `INSERT INTO ${TABLE} (name, type, mime, extension, active, deleted) VALUES (?, ?, ?, ?, 1, 0)`;
    const [result] = await connection.execute<ResultSetHeader>(query, [name, type, mime, extension]);

    return { insertId: result.insertId };
  } finally {
    connection.release();
  }
};

const updateMedia = async (id: number, data: Partial<MediaModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const { name, type, mime, extension, active, deleted } = data;
    const query = `UPDATE ${TABLE} SET name = ?, type = ?, mime = ?, extension = ?, active = ?, deleted = ? WHERE id = ?`;

    const [result] = await connection.execute<ResultSetHeader>(query, [
      name,
      type,
      mime,
      extension,
      active,
      deleted,
      id,
    ]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteMedia = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedMedia = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleMedia = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedMedia = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getMedia,
  getById: getMediaById,
  create: createMedia,
  update: updateMedia,
  delete: deleteMedia,
  deleteSelected: deleteSelectedMedia,
  toggle: toggleMedia,
  toggleSelected: toggleSelectedMedia,
};
