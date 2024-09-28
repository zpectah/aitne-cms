import { ResultSetHeader } from 'mysql2/promise';

import {
  settingsValueFormatKeys,
  SettingsTableModelData,
  SettingsModelData,
  SettingsModel,
  SettingsRowValueFormat,
  SettingsRowValue,
  SettingsSimpleModel,
} from '@model';
import { AffectedRowsResponse } from '../types';
import { pool } from '../utils';

const TABLE = 'cms_settings';

const transformRowValue = (value: string, format: SettingsRowValueFormat) => {
  switch (format) {
    case settingsValueFormatKeys['array.string']:
      return value.split(',').map(String);
    case settingsValueFormatKeys['array.number']:
      return value.split(',').map(Number);
    case settingsValueFormatKeys.boolean:
      return value === 'true';
    case settingsValueFormatKeys.number:
      return Number(value);
    case settingsValueFormatKeys.string:
    default:
      return value;
  }
};

const transformRows = (rows: SettingsTableModelData[]) => {
  const settings: SettingsSimpleModel = {};

  rows.forEach((row) => {
    settings[row.name] = transformRowValue(row.value, row.value_format);
  });

  return settings as unknown as SettingsModelData;
};

const getSettings = async (): Promise<SettingsModelData> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE}`;
    const [rows] = await connection.query<SettingsTableModelData[]>(query);

    return transformRows(rows);
  } finally {
    connection.release();
  }
};

const getSettingsByName = async (name: keyof SettingsModel): Promise<SettingsRowValue> => {
  const connection = await pool.getConnection();

  try {
    const query = `SELECT * FROM ${TABLE} WHERE name = ?`;
    const [rows] = await connection.query<SettingsTableModelData[]>(query, [name]);

    return transformRows(rows)[name];
  } finally {
    connection.release();
  }
};

const patchSettings = async (data: Partial<SettingsModel>): Promise<AffectedRowsResponse> => {
  const connection = await pool.getConnection();
  let affectedRows = 0;

  try {
    const keys = Object.keys(data);

    const queries = keys.map(async (name) => {
      // Every value must be as string, we don't care which format it is now
      // Name must be unique!
      const value = data[name as keyof SettingsModel]?.toString();
      const query = `UPDATE ${TABLE} SET value = ? WHERE name = ?`;
      const [result] = await connection.execute<ResultSetHeader>(query, [value, name]);

      if (result.affectedRows) ++affectedRows;
    });

    await Promise.all(queries);

    return { affectedRows };
  } finally {
    connection.release();
  }
};

export default {
  get: getSettings,
  getByName: getSettingsByName,
  patch: patchSettings,
};
