import TableCell from '@mui/material/TableCell';

import { ArticlesModel, ArticlesLangModel } from '@model';
import config from '../../../config';
import { ListTable, ButtonLink } from '../../components';
import { useArticlesList } from './hooks';

const ArticlesList = () => {
  const {
    table: { heading, items },
    query: { isError },
    onRowDelete,
    onSelectedDelete,
  } = useArticlesList();

  const renderRow = ({ id, name, type }: ArticlesModel) => (
    <>
      <TableCell>
        <ButtonLink path={`${config.routes.articles.path}/${id}`}>{name}</ButtonLink>
      </TableCell>
      <TableCell>{type}</TableCell>
    </>
  );

  return (
    <ListTable<ArticlesModel, ArticlesLangModel>
      headingCells={heading}
      items={items}
      onRowDelete={onRowDelete}
      onSelectedDelete={onSelectedDelete}
      perPage={5}
      renderRow={renderRow}
      rootPath={config.routes.articles.path}
      searchAttrs={['name', 'type']}
      searchLangAttrs={['title', 'description']}
    />
  );
};

export default ArticlesList;
