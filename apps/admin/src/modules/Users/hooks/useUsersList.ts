import { useMemo } from 'react';

import { UsersModel } from '@model';
import { useToastsStore, useUsersQuery, useUsersMutations } from '../../../hooks';

export const useUsersList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useUsersQuery();

  const { deleteMutation, deleteSelectedMutation } = useUsersMutations();
  const { createToast } = useToastsStore();

  const heading = [
    {
      id: 'name',
      children: 'Name',
    },
    {
      id: 'color',
      children: 'Color',
    },
  ];

  const items = useMemo(() => {
    let rows: UsersModel[] = [];

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
            createToast({ message: 'User was successfully deleted', severity: 'success', autoclose: 2500 });
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
    // TODO
    // TOD --- confirm dialog
    console.log('onSelectedDelete handler', selected);

    try {
      deleteSelectedMutation.mutate(
        {
          ids: selected,
        },
        {
          onSuccess: () => {
            refetch();
            createToast({ message: 'Selected users was successfully deleted', severity: 'success', autoclose: 2500 });
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
