import { RowDataPacket } from 'mysql2';

import { tagsColorKeys } from '../enums';

export type TagsColor = keyof typeof tagsColorKeys;

export interface TagsModel {
  id: number;
  name: string;
  color: TagsColor;
  created: string;
  updated: string;
  active: number;
  deleted: number;
}

export type TagsModelData = RowDataPacket & TagsModel;

export type TagsDetailForm = Omit<TagsModel, 'id' | 'created' | 'updated'>;
