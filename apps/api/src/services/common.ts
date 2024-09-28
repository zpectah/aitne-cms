import { Pool, ResultSetHeader } from 'mysql2/promise';
import { AffectedRowsResponse } from '../types';

export const deleteRow = async (id: number, pool: Pool, tableName: string): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const query = `UPDATE ${tableName} SET deleted = 1 WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

export const deleteRows = async (ids: number[], pool: Pool, tableName: string): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const placeholders = ids.map(() => '?').join(',');
    const query = `UPDATE ${tableName} SET deleted = 1 WHERE id IN (${placeholders})`;
    const [result] = await pool.execute<ResultSetHeader>(query, ids);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

export const toggleRow = async (id: number, pool: Pool, tableName: string): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const query = `UPDATE ${tableName} SET active = IF(active=1, 0, 1) WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

export const toggleRows = async (ids: number[], pool: Pool, tableName: string): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();

  try {
    const placeholders = ids.map(() => '?').join(',');
    const query = `UPDATE ${tableName} SET active = IF(active=1, 0, 1) WHERE id IN (${placeholders})`;
    const [result] = await pool.execute<ResultSetHeader>(query, ids);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};
