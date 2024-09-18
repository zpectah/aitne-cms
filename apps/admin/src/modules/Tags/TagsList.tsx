import TableCell from '@mui/material/TableCell';

import { TagsModel } from '@model';
import config from '../../../config';
import { ListTable } from '../../components';

const TagsList = () => {
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

  const items: TagsModel[] = [
    {
      id: 1,
      name: 'tag1',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 2,
      name: 'tag2',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 3,
      name: 'tag3',
      color: 'black',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 4,
      name: 'tag4',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 5,
      name: 'tag5',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 6,
      name: 'tag6',
      color: 'black',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 7,
      name: 'tag7',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 8,
      name: 'tag8',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 9,
      name: 'tag9',
      color: 'black',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 10,
      name: 'tag10',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 11,
      name: 'tag11',
      color: 'none',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
    {
      id: 12,
      name: 'tag12',
      color: 'black',
      created: '2024-09-10T16:44:37.448Z',
      updated: '2024-09-10T16:44:37.448Z',
      active: 1,
      deleted: 0,
    },
  ];

  const rowDeleteHandler = (id: number) => {
    // TODO
    console.log('delete handler', id);
  };

  const selectedDeleteHandler = (selected: readonly number[]) => {
    // TODO
    console.log('onSelectedDelete handler', selected);
  };

  const selectedExportHandler = (selected: readonly number[]) => {
    // TODO
    console.log('onSelectedExport handler', selected);
  };

  const renderRow = ({ name, color }: TagsModel) => (
    <>
      <TableCell>{name}</TableCell>
      <TableCell>{color}</TableCell>
    </>
  );

  return (
    <ListTable<TagsModel>
      headingCells={heading}
      items={items}
      onRowDelete={rowDeleteHandler}
      onSelectedDelete={selectedDeleteHandler}
      onSelectedExport={selectedExportHandler}
      perPage={5}
      renderRow={renderRow}
      rootPath={config.routes.tags.path}
    />
  );
};

export default TagsList;
