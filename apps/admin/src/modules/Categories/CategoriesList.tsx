import TableCell from '@mui/material/TableCell';

import { CategoriesModel, CategoriesLangModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useCategoriesList } from './hooks';

const CategoriesList = () => {
  const {
    table: { heading, items },
    query: { isError }, // TODO #error handler
    onRowDelete,
    onSelectedDelete,
  } = useCategoriesList();

  const renderRow = ({ id, name, parent_id }: CategoriesModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.categories.path}/${id}`}>{name}</ButtonLink>
      </TableCell>
      <TableCell>{parent_id}</TableCell>
    </>
  );

  return (
    <ListTable<CategoriesModel, CategoriesLangModel>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onSelectedDelete={onSelectedDelete}
      renderRow={renderRow}
      rootPath={config.routes.categories.path}
      searchAttrs={['name']}
      searchLangAttrs={['title']}
      sortColumns={['id', 'name', 'updated']}
    />
  );
};

export default CategoriesList;
