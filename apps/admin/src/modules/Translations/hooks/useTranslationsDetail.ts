import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { translationsTypeKeys, TranslationsFormData } from '@model';
import config from '../../../../config';
import { useSettings, useToastsStore, useTranslationsMutations, useTranslationsQuery } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useTranslationsDetail = () => {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation(['options', 'messages']);
  const form = useForm<TranslationsFormData>({});
  const navigate = useNavigate();
  const { id } = useParams();
  const { createMutation, updateMutation } = useTranslationsMutations();
  const { query } = useTranslationsQuery();
  const { createToast } = useToastsStore();
  const typeKeys = Object.keys(translationsTypeKeys);
  const { settings } = useSettings();
  const languages = settings['app.language_active'];

  const options = {
    type: typeKeys.map((type) => ({
      id: type,
      value: type,
      label: t(`translations.type.${type}`),
    })),
  };

  const submitHandler: SubmitHandler<TranslationsFormData> = (data, event) => {
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
                navigate(config.routes.translations.path);
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
                navigate(config.routes.translations.path);
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
    languages,
  };
};
