import { RowDataPacket } from 'mysql2';

import { translationsTypeKeys } from '../enums';

export type TranslationsType = keyof typeof translationsTypeKeys;

export type TranslationsLangModel = {
  value: string;
};

export interface TranslationsLangProps {
  [p: string]: TranslationsLangModel;
}

export interface TranslationsModel {
  id: number;
  name: string;
  type: TranslationsType;
  lang: TranslationsLangProps;
  created: string;
  updated: string;
  active: number;
  deleted: number;
}

export type TranslationsModelData = RowDataPacket & TranslationsModel;

export interface TranslationsFormData extends Omit<TranslationsModel, 'id' | 'created' | 'updated'> {
  id?: number | 'new';
}
