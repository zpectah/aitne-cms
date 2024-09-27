import { RowDataPacket } from 'mysql2';

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
  publish_start: string;
  publish_end: string;
  active: number;
  deleted: number;
}

export type ArticlesModelData = RowDataPacket &
  Omit<ArticlesModel, 'tags' | 'categories'> & {
    tags: string;
    categories: string;
  };

export interface ArticlesFormData extends Omit<ArticlesModel, 'id' | 'created' | 'updated'> {
  id?: number | 'new';
}
