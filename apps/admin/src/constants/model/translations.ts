import { translationsTypeKeys, TranslationsFormData, TranslationsType } from '@model';

export const TranslationsBlankModel: TranslationsFormData = {
  name: '',
  type: translationsTypeKeys.default as TranslationsType,
  active: 1,
  deleted: 0,
  lang: {},
};
