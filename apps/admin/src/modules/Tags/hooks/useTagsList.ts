import { useMemo } from 'react';

import { TagsModel } from '@model';
import { useTagsQuery, useTagsMutations } from '../../../hooks';

export const useTagsList = () => {
  const {
    query: { data, isLoading, refetch, ...query },
  } = useTagsQuery();

  const { deleteMutation } = useTagsMutations();

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
    console.log('onSelectedDelete handler', selected);
  };

  const selectedExportHandler = (selected: readonly number[]) => {
    // TODO
    console.log('onSelectedExport handler', selected);
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
    onSelectedExport: selectedExportHandler,
  };
};
