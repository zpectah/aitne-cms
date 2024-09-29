import { ResultSetHeader } from 'mysql2/promise';

import { CommentsModel, CommentsFormData, CommentsModelData } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, InsertedIdResponse } from '../types';

const TABLE = 'cms_comments';

const getComments = async (): Promise<CommentsModelData[]> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE deleted = 0`;
    const [rows] = await connection.query<CommentsModelData[]>(query);

    return rows;
  } finally {
    connection.release();
  }
};

const getCommentById = async (id: number): Promise<CommentsModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE id = ? AND deleted = 0`;
    const [rows] = await connection.query<CommentsModelData[]>(query, [id]);

    return rows[0];
  } finally {
    connection.release();
  }
};

const createComment = async (data: CommentsFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { origin_type, origin_id, parent_id, sender, title, content } = data;
    const query = `INSERT INTO ${TABLE} (origin_type, origin_id, parent_id, sender, title, content) VALUES (?, ?, ?, ?, ?, ?)`;

    const [result] = await connection.execute<ResultSetHeader>(query, [
      origin_type,
      origin_id,
      parent_id,
      sender,
      title,
      content,
    ]);

    return { insertId: result.insertId };
  } finally {
    connection.release();
  }
};

const updateComment = async (id: number, data: Partial<CommentsModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const { sender, title, content } = data;
    const query = `UPDATE ${TABLE} SET sender = ?, title = ?, content = ? WHERE id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(query, [sender, title, content, id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteComment = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedComments = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleComment = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedComments = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getComments,
  getById: getCommentById,
  create: createComment,
  update: updateComment,
  delete: deleteComment,
  deleteSelected: deleteSelectedComments,
  toggle: toggleComment,
  toggleSelected: toggleSelectedComments,
};
