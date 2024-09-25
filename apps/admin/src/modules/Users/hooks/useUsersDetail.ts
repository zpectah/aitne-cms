import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { usersTypeKeys, usersRoleKeys, UsersFormData } from '@model';
import config from '../../../../config';
import { useToastsStore, useUsersMutations, useUsersQuery } from '../../../hooks';

export const useUsersDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation('options');
  const form = useForm<UsersFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { createMutation, updateMutation } = useUsersMutations();
  const { query } = useUsersQuery();
  const { createToast } = useToastsStore();
  const typeKeys = Object.keys(usersTypeKeys);
  const roleKeys = Object.keys(usersRoleKeys);

  const options = {
    type: typeKeys.map((type) => ({
      id: type,
      value: type,
      label: type,
    })),
    role: roleKeys.map((role) => ({
      id: role,
      value: role,
      label: role,
    })),
  };

  const submitHandler: SubmitHandler<UsersFormData> = (data, event) => {
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
                navigate(config.routes.users.path);
                createToast({ message: 'User was successfully created', severity: 'success', autoclose: 2500 });
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
                navigate(config.routes.users.path);
                createToast({ message: 'User was successfully updated', severity: 'success', autoclose: 2500 });
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
