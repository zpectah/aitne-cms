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
}
