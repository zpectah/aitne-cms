import { RowDataPacket } from 'mysql2';

export type CategoriesLangModel = {
  title: string;
};

export interface CategoriesLangProps {
  [p: string]: CategoriesLangModel;
}

export interface CategoriesModel {
  active: number;
  created: string;
  deleted: number;
  id: number;
  lang: CategoriesLangProps;
  name: string;
  parent_id?: number | '';
  updated: string;
}

export type CategoriesModelData = RowDataPacket & CategoriesModel;

export interface CategoriesFormData extends Omit<CategoriesModel, 'id' | 'created' | 'updated'> {
  id?: number | 'new';
}
