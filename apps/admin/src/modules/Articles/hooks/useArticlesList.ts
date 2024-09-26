import { useMemo } from 'react';

import { ArticlesModel } from '@model';
import { useToastsStore, useArticlesMutations, useArticlesQuery } from '../../../hooks';

export const useArticlesList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useArticlesQuery();

  const { deleteMutation, deleteSelectedMutation } = useArticlesMutations();
  const { createToast } = useToastsStore();

  const heading = [
    {
      id: 'name',
      children: 'Name',
    },
    {
      id: 'type',
      children: 'Type',
    },
  ];

  const items = useMemo(() => {
    let rows: ArticlesModel[] = [];

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
            createToast({ message: 'Article was successfully deleted', severity: 'success', autoclose: 2500 });
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
              message: 'Selected articles was successfully deleted',
              severity: 'success',
              autoclose: 2500,
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
