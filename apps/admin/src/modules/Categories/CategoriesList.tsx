import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';

import { CategoriesModel, CategoriesLangModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useCategoriesList, useCategoriesListStore } from './hooks';

const CategoriesList = () => {
  const { t } = useTranslation(['options']);
  const { sort, setSort } = useCategoriesListStore();

  const {
    table: { heading, items },
    query: { isError }, // TODO #error handler
    onRowDelete,
    onSelectedDelete,
    onRowToggle,
    onSelectedToggle,
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
      onRowToggle={onRowToggle}
      onSelectedDelete={onSelectedDelete}
      onSelectedToggle={onSelectedToggle}
      onSortChange={setSort}
      renderRow={renderRow}
      rootPath={config.routes.categories.path}
      searchAttrs={['name']}
      searchLangAttrs={['title']}
      sortColumns={['id', 'name', 'updated']}
      sortDefaults={{ ...sort }}
    />
  );
};

export default CategoriesList;
