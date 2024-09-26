import { ResultSetHeader } from 'mysql2/promise';

import { ArticlesModelData, ArticlesFormData, ArticlesLangProps, ArticlesModel } from '@model';
import { pool } from '../utils';

const TABLE = 'cms_articles';
const LANGUAGES = ['en', 'cs']; // TODO

const getArticles = async (): Promise<ArticlesModel[]> => {
  const connection = await pool.getConnection();

  try {
    const languageSelects = LANGUAGES.map(
      (lang) =>
        `${lang}.title AS ${lang}_title, ${lang}.description AS ${lang}_description, ${lang}.content AS ${lang}_content`
    ).join(', ');

    const languageJoins = LANGUAGES.map(
      (lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.article_id`
    ).join(' ');

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

    const [rows] = await pool.query<ArticlesModelData[]>(query);

    return rows.map((row) => {
      const langData: ArticlesLangProps = {};

      LANGUAGES.forEach((lang) => {
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
        tags: row.tags,
        categories: row.categories,
        custom_fields: '', // TODO
        publish_start: row.publish_start,
        publish_end: row.publish_end,
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

const getArticleById = async (id: number): Promise<ArticlesModel> => {
  const connection = await pool.getConnection();

  try {
    const languageSelects = LANGUAGES.map(
      (lang) =>
        `${lang}.title AS ${lang}_title, ${lang}.description AS ${lang}_description, ${lang}.content AS ${lang}_content`
    ).join(', ');

    const languageJoins = LANGUAGES.map(
      (lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.article_id`
    ).join(' ');

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

    const [rows] = await pool.query<ArticlesModelData[]>(query, [id]);
    const row = rows[0];
    const langData: ArticlesLangProps = {};

    LANGUAGES.forEach((lang) => {
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
      tags: row.tags,
      categories: row.categories,
      custom_fields: '', // TODO
      publish_start: row.publish_start,
      publish_end: row.publish_end,
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

const createArticle = async (data: ArticlesFormData): Promise<{ insertId: number }> => {
  const connection = await pool.getConnection();

  try {
    const insertQuery = `
      INSERT INTO ${TABLE} (name, type, tags, categories, publish_start, publish_end, active, deleted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await pool.execute<ResultSetHeader>(insertQuery, [
      data.name,
      data.type,
      data.tags,
      data.categories,
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

const updateArticle = async (
  id: number,
  data: ArticlesFormData
): Promise<{ affectedRows: number; affectedLangRows: string[] }> => {
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
      data.tags,
      data.categories,
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

const deleteArticle = async (id: number): Promise<{ affectedRows: number }> => {
  const connection = await pool.getConnection();

  try {
    const query = `UPDATE ${TABLE} SET deleted = 1 WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);

    return { affectedRows: result.affectedRows };
  } finally {
    connection.release();
  }
};

const deleteSelectedArticles = async (ids: number[]): Promise<{ affectedRows: number }> => {
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
  get: getArticles,
  getById: getArticleById,
  create: createArticle,
  update: updateArticle,
  delete: deleteArticle,
  deleteSelected: deleteSelectedArticles,
};
