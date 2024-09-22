import { useMemo } from 'react';

import { CategoriesModel } from '@model';
import { useToastsStore, useCategoriesMutations, useCategoriesQuery } from '../../../hooks';

export const useCategoriesList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useCategoriesQuery();

  const { deleteMutation, deleteSelectedMutation } = useCategoriesMutations();
  const { createToast } = useToastsStore();

  const heading = [
    {
      id: 'name',
      children: 'Name',
    },
    {
      id: 'parent_id',
      children: 'Parent',
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
            createToast({ message: 'Category was successfully deleted', severity: 'success', autoclose: 2500 });
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
              message: 'Selected categories was successfully deleted',
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
