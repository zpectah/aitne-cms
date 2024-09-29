import { pagesTypeKeys } from '../enums';

export type PagesType = keyof typeof pagesTypeKeys;

export interface PagesModel {
  id: number;
  name: string;
  type: PagesType;
  categories: number[];
  created: string;
  updated: string;
  active: number;
  deleted: number;
}
