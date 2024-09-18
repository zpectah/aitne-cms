import TableCell from '@mui/material/TableCell';

import { TagsModel } from '@model';
import { ListTable } from '../../components';

const TagsList = () => {
  return (
    <ListTable<TagsModel>
      headingCells={[
        {
          id: 'name',
          children: 'Name',
        },
        {
          id: 'color',
          children: 'Color',
        },
      ]}
      items={[
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
      ]}
      onRowDelete={(id) => {
        console.log('delete handler', id);
      }}
      onSelectedDelete={(selected) => {
        console.log('onSelectedDelete handler', selected);
      }}
      onSelectedExport={(selected) => {
        console.log('onSelectedExport handler', selected);
      }}
      perPage={5}
      renderRow={({ name, color }) => (
        <>
          <TableCell>{name}</TableCell>
          <TableCell>{color}</TableCell>
        </>
      )}
      rootPath="/tags"
    />
  );
};

export default TagsList;
