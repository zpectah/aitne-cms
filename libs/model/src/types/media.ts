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
