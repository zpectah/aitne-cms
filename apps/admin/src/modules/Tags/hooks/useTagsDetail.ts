import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { tagsColorKeys, TagsFormData } from '@model';
import config from '../../../../config';
import { useTagsMutations, useTagsQuery } from '../../../hooks';

export const useTagsDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation('options');
  const form = useForm<TagsFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const colorKeys = Object.keys(tagsColorKeys);
  const { createMutation, updateMutation } = useTagsMutations();
  const { query } = useTagsQuery();

  const options = {
    color: colorKeys.map((color) => ({
      id: color,
      value: color,
      label: t(`tags.color.${color}`),
    })),
  };

  const submitHandler: SubmitHandler<TagsFormData> = (data, event) => {
    if (data && id) {
      const master = Object.assign(data);

      setLoading(true);

      if (id === 'new') {
        try {
          createMutation.mutate(
            {
              ...master,
            },
            {
              onSuccess: () => {
                navigate(config.routes.tags.path);
                console.log('on success');
                query.refetch();
              },
              onError: () => {
                console.log('on error');
              },
            }
          );
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          updateMutation.mutate(
            {
              ...master,
            },
            {
              onSuccess: () => {
                navigate(config.routes.tags.path);
                console.log('on success update');
                query.refetch();
              },
              onError: () => {
                console.log('on error update');
              },
            }
          );
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return {
    options,
    onSubmit: submitHandler,
    form,
    isLoading,
  };
};
