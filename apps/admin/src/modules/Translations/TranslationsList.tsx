import TableCell from '@mui/material/TableCell';

import { TranslationsModel, TranslationsLangModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useTranslationsList } from './hooks';

const TranslationsList = () => {
  const {
    table: { heading, items },
    query: { isError }, // TODO #error handler
    onRowDelete,
    onSelectedDelete,
  } = useTranslationsList();

  const renderRow = ({ id, name, type }: TranslationsModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.translations.path}/${id}`}>{name}</ButtonLink>
      </TableCell>
      <TableCell>{type}</TableCell>
    </>
  );

  return (
    <ListTable<TranslationsModel, TranslationsLangModel>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onSelectedDelete={onSelectedDelete}
      renderRow={renderRow}
      rootPath={config.routes.translations.path}
      searchAttrs={['name']}
      searchLangAttrs={['value']}
      sortColumns={['id', 'name', 'updated']}
    />
  );
};

export default TranslationsList;
