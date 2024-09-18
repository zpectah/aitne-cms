import { ViewLayout, DetailDrawerWrapper } from '../../components';
import ArticlesList from './ArticlesList';
import ArticlesDetail from './ArticlesDetail';

const Articles = () => (
  <ViewLayout meta={{ title: 'Articles' }} title="Articles">
    <ArticlesList />
    <DetailDrawerWrapper rootPath="/articles">
      <ArticlesDetail />
    </DetailDrawerWrapper>
  </ViewLayout>
);

export default Articles;
