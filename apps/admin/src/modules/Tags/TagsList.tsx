import TableCell from '@mui/material/TableCell';

import { TagsModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useTagsList } from './hooks';

const TagsList = () => {
  const {
    table: { heading, items },
    query: { isError },
    onRowDelete,
    onSelectedDelete,
  } = useTagsList();

  const renderRow = ({ id, name, color }: TagsModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.tags.path}/${id}`}>{name}</ButtonLink>
      </TableCell>
      <TableCell>{color}</TableCell>
    </>
  );

  return (
    <ListTable<TagsModel>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onSelectedDelete={onSelectedDelete}
      perPage={5}
      renderRow={renderRow}
      rootPath={config.routes.tags.path}
    />
  );
};

export default TagsList;
