import { useTranslation } from 'react-i18next';
import TableCell from '@mui/material/TableCell';

import { ArticlesModel, ArticlesLangModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useArticlesList } from './hooks';

const ArticlesList = () => {
  const { t } = useTranslation(['options']);

  const {
    table: { heading, items },
    query: { isError }, // TODO #error handler
    onRowDelete,
    onSelectedDelete,
    onRowToggle,
    onSelectedToggle,
  } = useArticlesList();

  const renderRow = ({ id, name, type }: ArticlesModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.articles.path}/${id}`}>{name}</ButtonLink>
      </TableCell>
      <TableCell>{t(`options:articles.type.${type}`)}</TableCell>
    </>
  );

  return (
    <ListTable<ArticlesModel, ArticlesLangModel>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onRowToggle={onRowToggle}
      onSelectedDelete={onSelectedDelete}
      onSelectedToggle={onSelectedToggle}
      renderRow={renderRow}
      rootPath={config.routes.articles.path}
      searchAttrs={['name', 'type']}
      searchLangAttrs={['title', 'description']}
      sortColumns={['id', 'name', 'updated']}
    />
  );
};

export default ArticlesList;
