import { ViewLayout, DetailDrawerWrapper } from '../../components';
import ArticlesList from './Articles.list';
import ArticlesDetail from './Articles.detail';

const Articles = () => (
  <ViewLayout meta={{ title: 'Articles' }} title="Articles">
    <ArticlesList />
    <DetailDrawerWrapper rootPath="/articles">
      <ArticlesDetail />
    </DetailDrawerWrapper>
  </ViewLayout>
);

export default Articles;
