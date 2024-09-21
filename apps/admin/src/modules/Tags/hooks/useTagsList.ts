import { useMemo } from 'react';

import { TagsModel } from '@model';
import { useTagsQuery, useTagsMutations } from '../../../hooks';

export const useTagsList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useTagsQuery();

  const { deleteMutation, deleteSelectedMutation } = useTagsMutations();

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
            console.log('delete success');
            refetch();
          },
          onError: () => {
            console.log('on delete error');
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
            console.log('delete selected success');
            refetch();
          },
          onError: () => {
            console.log('on delete selected error');
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
