import { RowDataPacket } from 'mysql2';

import { mediaTypeKeys } from '../enums';

export type MediaType = keyof typeof mediaTypeKeys;

export interface MediaModel {
  id: number;
  name: string;
  type: MediaType;
  mime: string;
  extension: string;
  created: string;
  active: number;
  deleted: number;
}

export type MediaModelData = RowDataPacket & MediaModel;

export interface MediaFormData extends Omit<MediaModel, 'id' | 'created'> {
  id?: number | 'new';
}
