import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';

import { TagsModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useTagsList } from './hooks';

const TagsList = () => {
  const { t } = useTranslation(['options']);

  const {
    table: { heading, items },
    query: { isError }, // TODO #error handler
    onRowDelete,
    onSelectedDelete,
  } = useTagsList();

  const renderRow = ({ id, name, color }: TagsModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.tags.path}/${id}`}>{name}</ButtonLink>
      </TableCell>
      <TableCell>{t(`options:tags.color.${color}`)} #todo</TableCell>
    </>
  );

  return (
    <ListTable<TagsModel, NonNullable<unknown>>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onSelectedDelete={onSelectedDelete}
      renderRow={renderRow}
      rootPath={config.routes.tags.path}
      searchAttrs={['name', 'color']}
      sortColumns={['id', 'name', 'updated']}
    />
  );
};

export default TagsList;
