import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoriesModel } from '@model';
import { useToastsStore, useCategoriesMutations, useCategoriesQuery } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useCategoriesList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useCategoriesQuery();

  const { t } = useTranslation(['table', 'messages']);
  const { deleteMutation, deleteSelectedMutation, toggleMutation, toggleSelectedMutation } = useCategoriesMutations();
  const { createToast } = useToastsStore();

  const heading = [
    {
      id: 'name',
      children: t('table:title.name'),
    },
    {
      id: 'parent_id',
      children: t('table:title.parent'),
    },
  ];

  const items = useMemo(() => {
    let rows: CategoriesModel[] = [];

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
              message: t('messages:detail.success.deleted'),
              severity: 'success',
              autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
            });
          },
          onError: () => {
            createToast({ message: t('messages:detail.error.deleted'), severity: 'error' });
          },
        }
      );
    } catch (err) {
      createToast({ message: t('message:common.error.unspecified'), severity: 'error' });
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
              message: t('messages:selected.success.deleted'),
              severity: 'success',
              autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
            });
          },
          onError: () => {
            createToast({ message: t('messages:selected.error.deleted'), severity: 'error' });
          },
        }
      );
    } catch (err) {
      createToast({ message: t('message:common.error.unspecified'), severity: 'error' });
      console.error(err);
    }
  };

  const rowToggleHandler = (id: number) => {
    try {
      toggleMutation.mutate(
        {
          id,
        },
        {
          onSuccess: () => {
            refetch();
            createToast({
              message: t('messages:detail.success.updated'),
              severity: 'success',
              autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
            });
          },
          onError: () => {
            createToast({ message: t('messages:detail.error.updated'), severity: 'error' });
          },
        }
      );
    } catch (err) {
      createToast({ message: t('message:common.error.unspecified'), severity: 'error' });
      console.error(err);
    }
  };

  const selectedToggleHandler = (selected: readonly number[]) => {
    try {
      toggleSelectedMutation.mutate(
        {
          ids: selected,
        },
        {
          onSuccess: () => {
            refetch();
            createToast({
              message: t('messages:selected.success.updated'),
              severity: 'success',
              autoclose: TOAST_AUTOCLOSE_DELAY_DEFAULT,
            });
          },
          onError: () => {
            createToast({ message: t('messages:selected.error.updated'), severity: 'error' });
          },
        }
      );
    } catch (err) {
      createToast({ message: t('message:common.error.unspecified'), severity: 'error' });
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
    onRowToggle: rowToggleHandler,
    onSelectedToggle: selectedToggleHandler,
  };
};
