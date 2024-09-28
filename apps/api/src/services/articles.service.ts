import { ResultSetHeader } from 'mysql2/promise';

import { ArticlesModelData, ArticlesFormData, ArticlesLangProps, ArticlesModel } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, AffectedRowsWithLangResponse, InsertedIdResponse } from '../types';
import settingsService from './settings.service';

const TABLE = 'cms_articles';

const getArticlesObject = (row: ArticlesModelData, languages: string[]) => {
  const langData: ArticlesLangProps = {};

  languages.forEach((lang) => {
    langData[lang] = {
      title: row[`${lang}_title`],
      description: row[`${lang}_description`],
      content: row[`${lang}_content`],
    };
  });

  return {
    id: row.id,
    name: row.name,
    type: row.type,
    tags: row.tags.split(',').map(Number),
    categories: row.categories.split(',').map(Number),
    custom_fields: '', // TODO
    publish_start: row.publish_start,
    publish_end: row.publish_end,
    updated: row.updated,
    created: row.created,
    active: row.active,
    deleted: row.deleted,
    lang: langData,
  };
};

const getArticles = async (): Promise<ArticlesModel[]> => {
  const connection = await pool.getConnection();

  try {
    const languages = (await settingsService.getByName('app.language_active')) as string[];

    const languageSelects = languages
      .map(
        (lang) =>
          `${lang}.title AS ${lang}_title, ${lang}.description AS ${lang}_description, ${lang}.content AS ${lang}_content`
      )
      .join(', ');

    const languageJoins = languages
      .map((lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.article_id`)
      .join(' ');

    const query = `
      SELECT
        c.id,
        c.name,
        c.type,
        c.tags,
        c.categories,
        c.publish_start,
        c.publish_end,
        c.updated,
        c.created,
        c.active,
        c.deleted,
        ${languageSelects}
      FROM ${TABLE} c
        ${languageJoins}
      WHERE deleted = 0;
    `;

    const [rows] = await connection.query<ArticlesModelData[]>(query);

    return rows.map((row) => getArticlesObject(row, languages));
  } finally {
    connection.release();
  }
};

const getArticleById = async (id: number): Promise<ArticlesModel> => {
  const connection = await pool.getConnection();

  try {
    const languages = (await settingsService.getByName('app.language_active')) as string[];

    const languageSelects = languages
      .map(
        (lang) =>
          `${lang}.title AS ${lang}_title, ${lang}.description AS ${lang}_description, ${lang}.content AS ${lang}_content`
      )
      .join(', ');

    const languageJoins = languages
      .map((lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.article_id`)
      .join(' ');

    const query = `
      SELECT
        c.id,
        c.name,
        c.type,
        c.tags,
        c.categories,
        c.publish_start,
        c.publish_end,
        c.updated,
        c.created,
        c.active,
        c.deleted,
        ${languageSelects}
      FROM ${TABLE} c
      ${languageJoins}
      WHERE deleted = 0 AND c.id = ?;
    `;

    const [rows] = await connection.query<ArticlesModelData[]>(query, [id]);

    return getArticlesObject(rows[0], languages);
  } finally {
    connection.release();
  }
};

const createArticle = async (data: ArticlesFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const insertQuery = `
      INSERT INTO ${TABLE} (name, type, tags, categories, publish_start, publish_end, active, deleted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await connection.execute<ResultSetHeader>(insertQuery, [
      data.name,
      data.type,
      data.tags.toString(),
      data.categories.toString(),
      data.publish_start,
      data.publish_end,
      data.active,
      data.deleted,
    ]);

    const rootId = result.insertId;
    const languages = Object.keys(data.lang);

    const insertTitleQueries = languages.map((lang) =>
      connection.query(
        `
        INSERT INTO ${TABLE}__${lang} (article_id, title, description, content)
        VALUES (?, ?, ?, ?);
      `,
        [rootId, data.lang[lang].title, data.lang[lang].description, data.lang[lang].content]
      )
    );

    await Promise.all(insertTitleQueries);

    return { insertId: rootId };
  } finally {
    connection.release();
  }
};

const updateArticle = async (id: number, data: ArticlesFormData): Promise<AffectedRowsWithLangResponse> => {
  const connection = await pool.getConnection();

  try {
    const updateQuery = `
      UPDATE ${TABLE}
      SET name = ?, type = ?, tags = ?, categories = ?, publish_start = ?, publish_end = ?, active = ?, deleted = ?
      WHERE id = ?;
    `;

    const affectedLangRows: string[] = [];
    const languages = Object.keys(data.lang);

    const [result] = await connection.execute<ResultSetHeader>(updateQuery, [
      data.name,
      data.type,
      data.tags.toString(),
      data.categories.toString(),
      data.publish_start,
      data.publish_end,
      data.active,
      data.deleted,
      id,
    ]);

    const insertTitleQueries = languages.map((lang) =>
      connection.execute<ResultSetHeader>(
        `
          UPDATE ${TABLE}__${lang}
          SET title = ?, description = ?, content = ?
          WHERE article_id = ?;
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

const deleteArticle = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedArticles = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleArticle = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedArticles = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getArticles,
  getById: getArticleById,
  create: createArticle,
  update: updateArticle,
  delete: deleteArticle,
  deleteSelected: deleteSelectedArticles,
  toggle: toggleArticle,
  toggleSelected: toggleSelectedArticles,
};
