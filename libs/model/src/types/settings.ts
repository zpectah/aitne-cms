import { RowDataPacket } from 'mysql2';
import { settingsValueFormatKeys } from '../enums';

export type SettingsRowValueFormat = keyof typeof settingsValueFormatKeys;
export type SettingsRowValue = string | number | boolean | string[] | number[];

export type SettingsRowModel = {
  id: number;
  name: number;
  value: string;
  value_format: SettingsRowValueFormat;
  section: string;
};

export type SettingsTableModelData = RowDataPacket & SettingsRowModel;

export interface SettingsSimpleModel {
  [p: string]: SettingsRowValue;
}

export interface SettingsModel {
  'app.language_default': string;
  'app.language_active': string[];
  'app.language_available': string[];
  'app.meta_title': string;
  'app.meta_description': string;
}

export type SettingsModelData = SettingsModel;
