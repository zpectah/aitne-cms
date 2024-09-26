import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { ArticlesFormData } from '@model';
import config from '../../../../config';
import { useToastsStore, useArticlesMutations, useArticlesQuery } from '../../../hooks';

export const useArticlesDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<ArticlesFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { createMutation, updateMutation } = useArticlesMutations();
  const { query } = useArticlesQuery();
  const { createToast } = useToastsStore();
  const languages = ['en', 'cs']; // TODO #handle-globally

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
                createToast({ message: 'Article was successfully created', severity: 'success', autoclose: 2500 });
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
                createToast({ message: 'Article was successfully updated', severity: 'success', autoclose: 2500 });
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
    options: [],
    onSubmit: submitHandler,
    form,
    isLoading,
    languages,
  };
};
