import { useMemo } from 'react';

import { TagsModel } from '@model';
import { useTagsQuery, useTagsMutations } from '../../../hooks';

export const useTagsList = () => {
  const {
    query: { data, ...query },
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

    if (!query.isLoading && data) {
      rows = data;
    }

    return rows;
  }, [data, query.isLoading]);

  const rowDeleteHandler = (id: number) => {
    // TODO
    console.log('delete handler', id);

    deleteMutation.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          console.log('delete success');
        },
        onError: () => {
          console.log('on delete error');
        },
      }
    );
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
    query,
    onRowDelete: rowDeleteHandler,
    onSelectedDelete: selectedDeleteHandler,
    onSelectedExport: selectedExportHandler,
  };
};
