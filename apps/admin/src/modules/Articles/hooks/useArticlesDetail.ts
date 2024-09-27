import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { articlesTypeKeys, ArticlesFormData } from '@model';
import config from '../../../../config';
import { useToastsStore, useArticlesMutations, useArticlesQuery } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useArticlesDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation('options');
  const form = useForm<ArticlesFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { createMutation, updateMutation } = useArticlesMutations();
  const { query } = useArticlesQuery();
  const { createToast } = useToastsStore();
  const typeKeys = Object.keys(articlesTypeKeys);
  const languages = ['en', 'cs']; // TODO #handle-globally

  const options = {
    type: typeKeys.map((type) => ({
      id: type,
      value: type,
      label: t(`users.type.${type}`),
    })),
  };

  const submitHandler: SubmitHandler<ArticlesFormData> = (data, event) => {
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
                navigate(config.routes.articles.path);
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
                navigate(config.routes.articles.path);
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
    languages,
  };
};
