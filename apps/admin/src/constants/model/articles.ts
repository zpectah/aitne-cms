import { articlesTypeKeys, ArticlesFormData, ArticlesType } from '@model';

export const articlesBlankModel: ArticlesFormData = {
  name: '',
  type: articlesTypeKeys.default as ArticlesType,
  active: 1,
  deleted: 0,
  publish_start: '',
  publish_end: '',
  lang: {},
  custom_fields: '', // TODO
  tags: [],
  categories: [],
};
