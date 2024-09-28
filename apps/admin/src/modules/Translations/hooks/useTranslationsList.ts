import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TranslationsModel } from '@model';
import { useToastsStore, useTranslationsMutations, useTranslationsQuery } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useTranslationsList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useTranslationsQuery();

  const { t } = useTranslation(['table']);
  const { deleteMutation, deleteSelectedMutation } = useTranslationsMutations();
  const { createToast } = useToastsStore();

  const heading = [
    {
      id: 'name',
      children: t('table:title.name'),
    },
    {
      id: 'type',
      children: t('table:title.type'),
    },
  ];

  const items = useMemo(() => {
    let rows: TranslationsModel[] = [];

    if (!isLoading && data) {
      rows = data;
    }

    return rows;
  }, [data, isLoading]);

  const rowDeleteHandler = (id: number) => {
    try {
      deleteMutation.mutate(
        {
          id,
        },
        {
          onSuccess: () => {
            refetch();
            createToast({
              message: 'Item was successfully deleted',
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
    }
  };

  const selectedDeleteHandler = (selected: readonly number[]) => {
    try {
      deleteSelectedMutation.mutate(
        {
          ids: selected,
        },
        {
          onSuccess: () => {
            refetch();
            createToast({
              message: 'Selected items was successfully deleted',
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
    }
  };

  return {
    table: {
      heading,
      items,
    },
    isLoading,
    refetch,
    query,
    onRowDelete: rowDeleteHandler,
    onSelectedDelete: selectedDeleteHandler,
  };
};
