import { useMemo } from 'react';

import { TagsModel } from '@model';
import { useToastsStore, useTagsQuery, useTagsMutations } from '../../../hooks';

export const useTagsList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useTagsQuery();

  const { deleteMutation, deleteSelectedMutation } = useTagsMutations();
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
            createToast({ message: 'Tag was successfully deleted', severity: 'success', autoclose: 2500 });
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
            createToast({ message: 'Selected tags was successfully deleted', severity: 'success', autoclose: 2500 });
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
