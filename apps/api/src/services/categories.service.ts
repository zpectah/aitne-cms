import { ResultSetHeader } from 'mysql2/promise';

import { CategoriesModelData, CategoriesFormData, CategoriesLangProps, CategoriesModel } from '@model';
import { pool } from '../utils';

const TABLE = 'cms_categories';
const LANGUAGES = ['en', 'cs']; // TODO

const getCategories = async (): Promise<CategoriesModel[]> => {
  const connection = await pool.getConnection();

  try {
    const languageSelects = LANGUAGES.map((lang) => `${lang}.title AS ${lang}_title`).join(', ');

    const languageJoins = LANGUAGES.map(
      (lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.category_id`
    ).join(' ');

    const query = `
      SELECT
        c.id,
        c.name,
        c.parent_id,
        c.updated,
        c.created,
        c.active,
        c.deleted,
        ${languageSelects}
      FROM ${TABLE} c
        ${languageJoins};
    `;

    const [rows] = await pool.query<CategoriesModelData[]>(query);

    return rows.map((row) => {
      const langData: CategoriesLangProps = {};

      LANGUAGES.forEach((lang) => {
        langData[lang] = {
          title: row[`${lang}_title`],
        };
      });

      return {
        id: row.id,
        name: row.name,
        parent_id: row.parent_id,
        updated: row.updated,
        created: row.created,
        active: row.active,
        deleted: row.deleted,
        lang: langData,
      };
    });
  } finally {
    connection.release();
  }
};

const getCategoryById = async (id: number): Promise<CategoriesModel> => {
  const connection = await pool.getConnection();

  try {
    const languageSelects = LANGUAGES.map((lang) => `${lang}.title AS ${lang}_title`).join(', ');

    const languageJoins = LANGUAGES.map(
      (lang) => `LEFT JOIN cms_categories__${lang} ${lang} ON c.id = ${lang}.category_id`
    ).join(' ');

    const query = `
      SELECT
        c.id,
        c.name,
        c.parent_id,
        c.updated,
        c.created,
        c.active,
        c.deleted,
        ${languageSelects}
      FROM ${TABLE} c
      ${languageJoins}
      WHERE c.id = ?;
    `;

    const [rows] = await pool.query<CategoriesModelData[]>(query, [id]);
    const row = rows[0];
    const langData: CategoriesLangProps = {};

    LANGUAGES.forEach((lang) => {
      langData[lang] = {
        title: row[`${lang}_title`],
      };
    });

    return {
      id: row.id,
      name: row.name,
      parent_id: row.parent_id,
      updated: row.updated,
      created: row.created,
      active: row.active,
      deleted: row.deleted,
      lang: langData,
    };
  } finally {
    connection.release();
  }
};

const createCategory = async (data: CategoriesFormData): Promise<{ insertId: number }> => {
  const connection = await pool.getConnection();

  try {
    const insertCategoryQuery = `
      INSERT INTO ${TABLE} (name, parent_id, active, deleted)
      VALUES (?, ?, ?, ?);
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertCategoryQuery, [
      data.name,
      data.parent_id,
      data.active,
      data.deleted,
    ]);

    const categoryId = result.insertId;
    const languages = Object.keys(data.lang);

    const insertTitleQueries = languages.map((lang) =>
      connection.query(
        `
        INSERT INTO ${TABLE}__${lang} (category_id, title)
        VALUES (?, ?);
      `,
        [categoryId, data.lang[lang].title]
      )
    );

    await Promise.all(insertTitleQueries);

    return { insertId: categoryId };
  } finally {
    connection.release();
  }
};

const updateCategory = async (
  id: number,
  data: CategoriesFormData
): Promise<{ affectedRows: number; affectedLangRows: string[] }> => {
  const connection = await pool.getConnection();

  try {
    const updateCategoryQuery = `
      UPDATE ${TABLE}
      SET name = ?, parent_id = ?, active = ?, deleted = ?
      WHERE id = ?;
    `;

    const affectedLangRows: string[] = [];
    const languages = Object.keys(data.lang);

    const [result] = await connection.execute<ResultSetHeader>(updateCategoryQuery, [
      data.name,
      data.parent_id,
      data.active,
      data.deleted,
      id,
    ]);

    const insertTitleQueries = languages.map((lang) =>
      connection.execute<ResultSetHeader>(
        `
          UPDATE ${TABLE}__${lang}
          SET title = ?
          WHERE category_id = ?;
      `,
        [data.lang[lang].title, id]
      )
    );

    await Promise.all(insertTitleQueries);

    return {
      affectedRows: result.affectedRows,
      affectedLangRows,
    };
  } finally {
    connection.release();
  }
};

const deleteCategory = async (id: number): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteSelectedCategories = async (ids: number[]): Promise<{ affectedRows: number }> => {
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
  get: getCategories,
  getById: getCategoryById,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
  deleteSelected: deleteSelectedCategories,
};
