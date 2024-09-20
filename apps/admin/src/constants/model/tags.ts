import { tagsColorKeys, TagsDetailForm } from '@model';

export const tagsBlankModel: TagsDetailForm = {
  name: '',
  color: tagsColorKeys.none as keyof typeof tagsColorKeys,
  active: 1,
  deleted: 0,
};
