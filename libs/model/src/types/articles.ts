import { RowDataPacket } from 'mysql2';
import { Dayjs } from 'dayjs';

import { articlesTypeKeys } from '../enums';

export type ArticlesType = keyof typeof articlesTypeKeys;

export type ArticlesLangModel = {
  title: string;
  description: string;
  content: string;
};

export interface ArticlesLangProps {
  [p: string]: ArticlesLangModel;
}

type ArticlesCustomFieldsProps = string; // TODO

export interface ArticlesModel {
  id: number;
  name: string;
  type: ArticlesType;
  lang: ArticlesLangProps;
  tags: number[];
  categories: number[];
  custom_fields: ArticlesCustomFieldsProps;
  created: string;
  updated: string;
  publish_start: Dayjs | string;
  publish_end: Dayjs | string;
  active: number;
  deleted: number;
}

export type ArticlesModelData = RowDataPacket &
  Omit<ArticlesModel, 'tags' | 'categories' | 'publish_start' | 'publish_end'> & {
    tags: string;
    categories: string;
    publish_start: string;
    publish_end: string;
  };

export interface ArticlesFormData extends Omit<ArticlesModel, 'id' | 'created' | 'updated'> {
  id?: number | 'new';
}
