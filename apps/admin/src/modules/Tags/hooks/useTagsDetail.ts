import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { tagsColorKeys } from '@model';
import { useConfirmSore } from '../../../hooks';

export const useTagsDetail = () => {
  const { t } = useTranslation('options');
  const navigate = useNavigate();
  const { onOpen } = useConfirmSore();
  const colorKeys = Object.keys(tagsColorKeys);

  const options = {
    color: colorKeys.map((color) => ({
      id: color,
      value: color,
      label: t(`tags.color.${color}`),
    })),
  };

  const deleteHandler = () => {
    // TODO
    console.log('delete handler here');

    navigate('/tags');
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    // TODO
    e.preventDefault();

    // TODO #only if delete is triggered !!!
    onOpen(deleteHandler, '...todo...', '');
  };

  return {
    options,
    onSubmit: submitHandler,
  };
};
