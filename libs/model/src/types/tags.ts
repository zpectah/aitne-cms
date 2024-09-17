import { RowDataPacket } from 'mysql2';

export interface TagsModel {
  id: number;
  name: string;
  color: string;
  created: string;
  updated: string;
  active: number;
  deleted: number;
}

export type TagsModelData = RowDataPacket & TagsModel;
