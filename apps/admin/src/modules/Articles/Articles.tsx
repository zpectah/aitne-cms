import { useTranslation } from 'react-i18next';

import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import ArticlesList from './ArticlesList';
import ArticlesDetail from './ArticlesDetail';

const Articles = () => {
  const { t } = useTranslation('modules');

  return (
    <ViewLayout
      meta={{ title: t('articles.title') }}
      title={t('articles.title')}
      titleSlot={<NewButtonLink to={`${config.routes.articles.path}/new`}>{t('articles.new')}</NewButtonLink>}
    >
      <ArticlesList />
      <DetailDrawerWrapper rootPath={config.routes.articles.path}>
        <ArticlesDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Articles;
