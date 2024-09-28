import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { TagsModel } from '@model';
import { useToastsStore, useTagsQuery, useTagsMutations } from '../../../hooks';
import { TOAST_AUTOCLOSE_DELAY_DEFAULT } from '../../../constants';

export const useTagsList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useTagsQuery();

  const { t } = useTranslation(['table']);
  const { deleteMutation, deleteSelectedMutation, toggleMutation, toggleSelectedMutation } = useTagsMutations();
  const { createToast } = useToastsStore();

  const heading = [
    {
      id: 'name',
      children: t('table:title.name'),
    },
    {
      id: 'color',
      children: t('table:title.color'),
    },
  ];

  const items = useMemo(() => {
    let rows: TagsModel[] = [];

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
              message: 'Selected items was successfully updated',
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
    onRowToggle: rowToggleHandler,
    onSelectedToggle: selectedToggleHandler,
  };
};
