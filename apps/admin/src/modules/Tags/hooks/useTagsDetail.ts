import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { tagsColorKeys, TagsFormData } from '@model';
import { useConfirmSore, useTagsMutations } from '../../../hooks';

export const useTagsDetail = () => {
  const { t } = useTranslation('options');
  const form = useForm<TagsFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { onOpen } = useConfirmSore();
  const colorKeys = Object.keys(tagsColorKeys);
  const { createMutation, updateMutation } = useTagsMutations();

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

  const submitHandler: SubmitHandler<TagsFormData> = (data, event) => {
    console.log('data on submit', typeof data, data);
    console.log('data event', event);
    // TODO #only if delete is triggered !!!

    if (data && id) {
      const master = Object.assign(data);

      if (id === 'new') {
        createMutation.mutate(
          {
            ...master,
          },
          {
            onSuccess: () => {
              console.log('on success');
            },
            onError: () => {
              console.log('on error');
            },
          }
        );
      } else {
        updateMutation.mutate(
          {
            ...master,
          },
          {
            onSuccess: () => {
              console.log('on success update');
            },
            onError: () => {
              console.log('on error update');
            },
          }
        );
      }
    }

    onOpen(deleteHandler, '...todo...', '');
  };

  return {
    options,
    onSubmit: submitHandler,
    form,
  };
};
