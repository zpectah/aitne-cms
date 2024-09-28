import { ResultSetHeader } from 'mysql2/promise';

import { CategoriesModelData, CategoriesFormData, CategoriesLangProps, CategoriesModel } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, AffectedRowsWithLangResponse, InsertedIdResponse } from '../types';
import settingsService from './settings.service';

const TABLE = 'cms_categories';

const getCategoriesObject = (row: CategoriesModelData, languages: string[]) => {
  const langData: CategoriesLangProps = {};

  languages.forEach((lang) => {
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
};

const getCategories = async (): Promise<CategoriesModel[]> => {
  const connection = await pool.getConnection();

  try {
    const languages = (await settingsService.getByName('app.language_active')) as string[];
    const languageSelects = languages.map((lang) => `${lang}.title AS ${lang}_title`).join(', ');

    const languageJoins = languages
      .map((lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.category_id`)
      .join(' ');

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
      WHERE deleted = 0;
    `;

    const [rows] = await connection.query<CategoriesModelData[]>(query);

    return rows.map((row) => getCategoriesObject(row, languages));
  } finally {
    connection.release();
  }
};

const getCategoryById = async (id: number): Promise<CategoriesModel> => {
  const connection = await pool.getConnection();

  try {
    const languages = (await settingsService.getByName('app.language_active')) as string[];
    const languageSelects = languages.map((lang) => `${lang}.title AS ${lang}_title`).join(', ');

    const languageJoins = languages
      .map((lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.category_id`)
      .join(' ');

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
      WHERE deleted = 0 AND c.id = ?;
    `;

    const [rows] = await connection.query<CategoriesModelData[]>(query, [id]);

    return getCategoriesObject(rows[0], languages);
  } finally {
    connection.release();
  }
};

const createCategory = async (data: CategoriesFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const insertQuery = `
      INSERT INTO ${TABLE} (name, parent_id, active, deleted)
      VALUES (?, ?, ?, ?);
    `;

    const [result] = await connection.execute<ResultSetHeader>(insertQuery, [
      data.name,
      data.parent_id,
      data.active,
      data.deleted,
    ]);

    const rootId = result.insertId;
    const languages = Object.keys(data.lang);

    const insertTitleQueries = languages.map((lang) =>
      connection.query(
        `
        INSERT INTO ${TABLE}__${lang} (category_id, title)
        VALUES (?, ?);
      `,
        [rootId, data.lang[lang].title]
      )
    );

    await Promise.all(insertTitleQueries);

    return { insertId: rootId };
  } finally {
    connection.release();
  }
};

const updateCategory = async (id: number, data: CategoriesFormData): Promise<AffectedRowsWithLangResponse> => {
  const connection = await pool.getConnection();

  try {
    const updateQuery = `
      UPDATE ${TABLE}
      SET name = ?, parent_id = ?, active = ?, deleted = ?
      WHERE id = ?;
    `;

    const affectedLangRows: string[] = [];
    const languages = Object.keys(data.lang);

    const [result] = await connection.execute<ResultSetHeader>(updateQuery, [
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

const deleteCategory = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedCategories = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleCategory = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedCategories = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getCategories,
  getById: getCategoryById,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
  deleteSelected: deleteSelectedCategories,
  toggle: toggleCategory,
  toggleSelected: toggleSelectedCategories,
};
