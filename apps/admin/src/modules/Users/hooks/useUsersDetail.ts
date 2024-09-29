import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from 'react-hook-form';

import { usersTypeKeys, usersRoleKeys, UsersFormData } from '@model';
import { crypto } from '@common';
import config from '../../../../config';
import { useToastsStore, useUsersMutations, useUsersQuery } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useUsersDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(['options', 'messages']);
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
      label: t(`users.type.${type}`),
    })),
    role: roleKeys.map((role) => ({
      id: role,
      value: role,
      label: t(`users.role.${role}`),
    })),
  };

  const submitHandler: SubmitHandler<UsersFormData> = async (data, event) => {
    if (data && id) {
      let master: UsersFormData;

      setLoading(true);

      if (data.password) {
        const salt = crypto.getSalt();
        const password = await crypto.hashPassword(data.password, salt);

        master = { ...data, password, salt };
      } else {
        master = Object.assign(data);
      }

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
                createToast({
                  message: t('message:detail.success.created'),
                  severity: 'success',
                  autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
                });
              },
              onError: () => {
                createToast({ message: t('message:detail.error.created'), severity: 'error' });
              },
            }
          );
        } catch (err) {
          createToast({ message: t('message:common.error.unspecified'), severity: 'error' });
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
                createToast({
                  message: t('message:detail.success.updated'),
                  severity: 'success',
                  autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
                });
              },
              onError: () => {
                createToast({ message: t('message:detail.error.updated'), severity: 'error' });
              },
            }
          );
        } catch (err) {
          createToast({ message: t('message:common.error.unspecified'), severity: 'error' });
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
