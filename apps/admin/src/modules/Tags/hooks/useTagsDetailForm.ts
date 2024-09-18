import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { tagsColorKeys } from '@model';

export const useTagsDetailForm = () => {
  const { t } = useTranslation('options');
  const colorKeys = Object.keys(tagsColorKeys);

  const options = {
    color: colorKeys.map((color) => {
      return {
        id: color,
        value: color,
        label: t(`tags.color.${color}`),
      };
    }),
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    // TODO
    e.preventDefault();
  };

  return {
    options,
    onSubmit: submitHandler,
  };
};
