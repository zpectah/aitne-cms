import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { CategoriesFormData } from '@model';
import config from '../../../../config';
import { useToastsStore, useCategoriesMutations, useCategoriesQuery } from '../../../hooks';

export const useCategoriesDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const form = useForm<CategoriesFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { createMutation, updateMutation } = useCategoriesMutations();
  const { query } = useCategoriesQuery();
  const { createToast } = useToastsStore();

  const submitHandler: SubmitHandler<CategoriesFormData> = (data, event) => {
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
                navigate(config.routes.categories.path);
                createToast({ message: 'Category was successfully created', severity: 'success', autoclose: 2500 });
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
                navigate(config.routes.categories.path);
                createToast({ message: 'Category was successfully updated', severity: 'success', autoclose: 2500 });
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
  };
};
