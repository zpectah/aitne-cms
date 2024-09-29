import { RowDataPacket } from 'mysql2';

import { commentsOriginTypeKeys } from '../enums';

export type CommentsOriginType = keyof typeof commentsOriginTypeKeys;

export interface CommentsModel {
  id: number;
  origin_type: CommentsOriginType;
  origin_id: number;
  parent_id: number;
  sender: string;
  title: string;
  content: string;
  created: string;
  deleted: number;
}

export type CommentsModelData = RowDataPacket & CommentsModel;

export interface CommentsFormData extends Omit<CommentsModel, 'id' | 'created'> {
  id?: number | 'new';
}
