import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { tagsColorKeys, TagsDetailForm } from '@model';
import { useConfirmSore } from '../../../hooks';

export const useTagsDetail = () => {
  const { t } = useTranslation('options');
  const form = useForm<TagsDetailForm>({});
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

  const submitHandler: SubmitHandler<TagsDetailForm> = (data, event) => {
    console.log('data on submit', typeof data, data);
    console.log('data event', event);
    // TODO #only if delete is triggered !!!
    onOpen(deleteHandler, '...todo...', '');
  };

  return {
    options,
    onSubmit: submitHandler,
    form,
  };
};
