import { tagsColorKeys, TagsColor, TagsFormData } from '@model';

export const tagsBlankModel: TagsFormData = {
  name: '',
  color: tagsColorKeys.none as TagsColor,
  active: 1,
  deleted: 0,
};
