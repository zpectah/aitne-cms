import { ResultSetHeader } from 'mysql2/promise';

import { TranslationsModelData, TranslationsFormData, TranslationsLangProps, TranslationsModel } from '@model';
import { pool } from '../utils';
import { deleteRow, deleteRows, toggleRow, toggleRows } from './common';
import { AffectedRowsResponse, AffectedRowsWithLangResponse, InsertedIdResponse } from '../types';
import settingsService from './settings.service';

const TABLE = 'cms_translations';

const getTranslationsObject = (row: TranslationsModelData, languages: string[]) => {
  const langData: TranslationsLangProps = {};

  languages.forEach((lang) => {
    langData[lang] = {
      value: row[`${lang}_value`],
    };
  });

  return {
    id: row.id,
    name: row.name,
    type: row.type,
    updated: row.updated,
    created: row.created,
    active: row.active,
    deleted: row.deleted,
    lang: langData,
  };
};

const getTranslations = async (): Promise<TranslationsModel[]> => {
  const connection = await pool.getConnection();

  try {
    const languages = (await settingsService.getByName('app.language_active')) as string[];
    const languageSelects = languages.map((lang) => `${lang}.value AS ${lang}_value`).join(', ');

    const languageJoins = languages
      .map((lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.translation_id`)
      .join(' ');

    const query = `
      SELECT
        c.id,
        c.name,
        c.type,
        c.updated,
        c.created,
        c.active,
        c.deleted,
        ${languageSelects}
      FROM ${TABLE} c
        ${languageJoins}
      WHERE deleted = 0;
    `;

    const [rows] = await connection.query<TranslationsModelData[]>(query);

    return rows.map((row) => getTranslationsObject(row, languages));
  } finally {
    connection.release();
  }
};

const getTranslationById = async (id: number): Promise<TranslationsModel> => {
  const connection = await pool.getConnection();

  try {
    const languages = (await settingsService.getByName('app.language_active')) as string[];
    const languageSelects = languages.map((lang) => `${lang}.value AS ${lang}_value`).join(', ');

    const languageJoins = languages
      .map((lang) => `LEFT JOIN ${TABLE}__${lang} ${lang} ON c.id = ${lang}.translation_id`)
      .join(' ');

    const query = `
      SELECT
        c.id,
        c.name,
        c.type,
        c.updated,
        c.created,
        c.active,
        c.deleted,
        ${languageSelects}
      FROM ${TABLE} c
      ${languageJoins}
      WHERE deleted = 0 AND c.id = ?;
    `;

    const [rows] = await connection.query<TranslationsModelData[]>(query, [id]);

    return getTranslationsObject(rows[0], languages);
  } finally {
    connection.release();
  }
};

const createTranslation = async (data: TranslationsFormData): Promise<InsertedIdResponse> => {
  const connection = await pool.getConnection();

  try {
    const insertQuery = `
      INSERT INTO ${TABLE} (name, type, active, deleted)
      VALUES (?, ?, ?, ?);
    `;

    const [result] = await connection.execute<ResultSetHeader>(insertQuery, [
      data.name,
      data.type,
      data.active,
      data.deleted,
    ]);

    const rootId = result.insertId;
    const languages = Object.keys(data.lang);

    const insertTitleQueries = languages.map((lang) =>
      connection.query(
        `
        INSERT INTO ${TABLE}__${lang} (translation_id, value)
        VALUES (?, ?);
      `,
        [rootId, data.lang[lang].value]
      )
    );

    await Promise.all(insertTitleQueries);

    return { insertId: rootId };
  } finally {
    connection.release();
  }
};

const updateTranslation = async (id: number, data: TranslationsFormData): Promise<AffectedRowsWithLangResponse> => {
  const connection = await pool.getConnection();

  try {
    const updateQuery = `
      UPDATE ${TABLE}
      SET name = ?, type = ?, active = ?, deleted = ?
      WHERE id = ?;
    `;

    const affectedLangRows: string[] = [];
    const languages = Object.keys(data.lang);

    const [result] = await connection.execute<ResultSetHeader>(updateQuery, [
      data.name,
      data.type,
      data.active,
      data.deleted,
      id,
    ]);

    const insertTitleQueries = languages.map((lang) =>
      connection.execute<ResultSetHeader>(
        `
          UPDATE ${TABLE}__${lang}
          SET value = ?
          WHERE translation_id = ?;
      `,
        [data.lang[lang].value, id]
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

const deleteTranslation = async (id: number): Promise<AffectedRowsResponse> => deleteRow(id, pool, TABLE);
const deleteSelectedTranslations = async (ids: number[]): Promise<AffectedRowsResponse> => deleteRows(ids, pool, TABLE);
const toggleTranslation = async (id: number): Promise<AffectedRowsResponse> => toggleRow(id, pool, TABLE);
const toggleSelectedTranslations = async (ids: number[]): Promise<AffectedRowsResponse> => toggleRows(ids, pool, TABLE);

export default {
  get: getTranslations,
  getById: getTranslationById,
  create: createTranslation,
  update: updateTranslation,
  delete: deleteTranslation,
  deleteSelected: deleteSelectedTranslations,
  toggle: toggleTranslation,
  toggleSelected: toggleSelectedTranslations,
};
