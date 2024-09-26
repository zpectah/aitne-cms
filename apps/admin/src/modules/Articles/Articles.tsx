import config from '../../../config';
import { ViewLayout, DetailDrawerWrapper, NewButtonLink } from '../../components';
import ArticlesList from './ArticlesList';
import ArticlesDetail from './ArticlesDetail';

const Articles = () => {
  console.log('page view: Articles');

  return (
    <ViewLayout
      meta={{ title: 'Articles' }}
      title="Articles"
      titleSlot={<NewButtonLink to={`${config.routes.articles.path}/new`}>New article</NewButtonLink>}
    >
      <ArticlesList />
      <DetailDrawerWrapper rootPath={config.routes.articles.path}>
        <ArticlesDetail />
      </DetailDrawerWrapper>
    </ViewLayout>
  );
};

export default Articles;
