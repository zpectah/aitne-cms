import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { tagsColorKeys, TagsFormData } from '@model';
import config from '../../../../config';
import { useToastsStore, useTagsMutations, useTagsQuery } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useTagsDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation('options');
  const form = useForm<TagsFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { createMutation, updateMutation } = useTagsMutations();
  const { query } = useTagsQuery();
  const { createToast } = useToastsStore();
  const colorKeys = Object.keys(tagsColorKeys);

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
                query.refetch();
                navigate(config.routes.tags.path);
                createToast({
                  message: 'New item was successfully created',
                  severity: 'success',
                  autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
                });
              },
              onError: () => {
                createToast({ message: 'There is an error...', severity: 'error' });
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
                query.refetch();
                navigate(config.routes.tags.path);
                createToast({
                  message: 'Item was successfully updated',
                  severity: 'success',
                  autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
                });
              },
              onError: () => {
                createToast({ message: 'There is an error...', severity: 'error' });
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
